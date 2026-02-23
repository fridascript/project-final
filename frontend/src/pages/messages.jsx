import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  border: 1px solid red;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 30px;
`;

const MessageCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ProductTitle = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin: 0;
`;

const SenderInfo = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.small};
`;

const Message = styled.p`
  margin: 0;
`;

export const Messages = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchInterests = async () => {
      const response = await fetch(`http://localhost:5000/api/interests/my-interests/${userId}`);
      const data = await response.json();
      if (data.success) setInterests(data.response);
    };

    fetchInterests();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Title>Messages</Title>
        {interests.length === 0 && <p>No messages yet.</p>}
        {interests.map(interest => (
          <MessageCard key={interest._id}>
            <ProductTitle>Re: {interest.productId.title}</ProductTitle>
            <SenderInfo>{interest.name} – {interest.email} {interest.phone && `– ${interest.phone}`}</SenderInfo>
            <Message>{interest.message}</Message>
          </MessageCard>
        ))}
      </Container>
    </>
  );
};