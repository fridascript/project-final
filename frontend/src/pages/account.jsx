import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;
const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 30px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Label = styled.label`
  font-weight: bold;
  font-family: ${props => props.theme.fonts.body};
`;
const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;
const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
  min-height: 120px;
  resize: vertical;
`;
const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.accent};
`;
const SaveButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;

  &:hover {
    border: 1px solid #460202;
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

export const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: localStorage.getItem('accessToken') }
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ name: data.response.name, bio: data.response.bio || '' });
        setCurrentImage(data.response.profileImage || '');
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    if (profileImage) data.append('profileImage', profileImage);
    if (headerImage) data.append('headerImage', headerImage);

    const response = await fetch('http://localhost:5000/api/auth/me', {
      method: 'PUT',
      headers: { Authorization: localStorage.getItem('accessToken') },
      body: data
    });

    const result = await response.json();
    if (result.success) {
      setCurrentImage(result.response.profileImage);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>My account</Title>
        <Section>
          {currentImage && <ProfileImage src={currentImage} alt="Profile" />}
          
          <Field>
            <Label>Header image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setHeaderImage(e.target.files[0])} />
            </Field>

          <Field>
            <Label>Profile image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
          </Field>

          <Field>
            <Label>Artist name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </Field>

          <Field>
            <Label>About</Label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
          </Field>
          
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : saved ? 'Profile saved! ✓' : 'Update profile'}
          </SaveButton>
        </Section>
      </Container>
    </>
  );
};