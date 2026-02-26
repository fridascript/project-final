import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { useAuthStore } from '../zustandstore/useAuthStore.js';

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

const Subtitle = styled.p`
font-family: ${props => props.theme.fonts.text};
font-size: ${props => props.theme.fontSizes.medium};
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

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        login(data.response.accessToken, data.response.userId);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong, try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Login</Title>
        <Subtitle> Log in to post your own hand crafted items.</Subtitle>
        <Form>
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button onClick={handleLogin}>Login</Button>
          <Subtitle>Psst, not needed to log in if you just want to browse!
        </Subtitle>
        </Form>
      </Container>
    </>
  );
};