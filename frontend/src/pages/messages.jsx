import { useState, useEffect } from 'react';
import { API_URL } from '../tools/config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
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
  border: 1px solid ${props => props.read ? '#eee' : props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  opacity: ${props => props.read ? 0.8 : 1};
  transition: opacity 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.accent};
  }
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

const ReplyButton = styled.a`
  display: inline-block;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};

  &:hover { opacity: 0.9; }
`;

const UnreadDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #4e0303;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
`;

export const Messages = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [openId, setOpenId] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchInterests = async () => {
      const response = await fetch(`${API_URL}/api/interests/my-interests/${userId}`);
      const data = await response.json();
      if (data.success) setInterests(data.response);
    };

    fetchInterests();
  }, []);

  const handleOpen = async (interest) => {
    // toggles open/closed
    setOpenId(openId === interest._id ? null : interest._id);

    // messaged marked when read 
    if (!interest.read) {
      await fetch(`${API_URL}/api/interests/${interest._id}/read`, {
        method: 'PUT'
      });
      setInterests(interests.map(i => 
        i._id === interest._id ? { ...i, read: true } : i
      ));
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Messages</Title>
        {interests.length === 0 && <p>No messages yet.</p>}
        {interests.map(interest => (
          <MessageCard 
            key={interest._id} 
            read={interest.read}
            onClick={() => handleOpen(interest)}
          >
            <ProductTitle>
              {!interest.read && <UnreadDot />}
              Re: {interest.productId.title}
            </ProductTitle>
            <SenderInfo>{interest.name} – {interest.email} {interest.phone && `– ${interest.phone}`}</SenderInfo>
            
            {openId === interest._id && (
              <>
                <Message>{interest.message}</Message>
                <ReplyButton 
                  href={`mailto:${interest.email}?subject=Re: ${interest.productId.title}&body=Hi ${interest.name},`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Reply via email
                </ReplyButton>
              </>
            )}
          </MessageCard>
        ))}
      </Container>
    </>
  );
};