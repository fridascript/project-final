import { useState } from 'react';
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-family: ${props => props.theme.fonts.body};
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  margin-top: 10px;

  &:hover {
  border: 1px solid #460202;
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

`;

const ErrorMessage = styled.p`
  color: red;
`;

export const PostItem = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    forSale: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('forSale', formData.forSale);
    data.append('creator', userId);
    data.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (result.success) {
        setLoading(false); 
        navigate('/dashboard');
      } else {
        setLoading(false); 
        setError('Could not post item, try again.');
      }
    } catch (error) {
      setError('Something went wrong, try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Post item</Title>
        <Form>
          <div>
            <Label>Title</Label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Name of item" />
          </div>
          <div>
            <Label>Category</Label>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Ceramics">Ceramics</option>
              <option value="Painting">Painting</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Textile">Textile</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label>Price (kr)</Label>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" />
          </div>
          <CheckboxWrapper>
            <input type="checkbox" name="forSale" checked={formData.forSale} onChange={handleChange} />
            <Label>For sale</Label>
          </CheckboxWrapper>
          <div>
            <Label>Image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton onClick={handleSubmit} disabled={loading}>
  {loading ? 'Posting...' : 'Post item'}
</SubmitButton>
        </Form>
      </Container>
    </>
  );
};