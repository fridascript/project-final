import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  margin-top: 10px;

  &:hover { opacity: 0.9; }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: ${props => props.theme.fontSizes.small};
`;

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('accessToken', data.response.accessToken);
        localStorage.setItem('userId', data.response.userId);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
       console.log('Error:', error);
      setError('Something went wrong, try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Sign up</Title>
        <Form>
          <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={handleChange} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button onClick={handleRegister}>Sign up</Button>
        </Form>
      </Container>
    </>
  );
};