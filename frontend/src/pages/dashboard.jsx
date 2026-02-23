import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 50px;
  border: 1px solid red;
  border-radius: 8px;
  padding: 20px;
`;

const SectionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 50px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 10px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.p`
  font-weight: bold;
  margin: 0;
`;

const ProductPrice = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 4px 0 0;
`;

export const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

   const fetchMyProducts = async () => {
  const response = await fetch(`http://localhost:5000/api/products?userId=${userId}`);
  const data = await response.json();
  if (data.success) setProducts(data.response);
};

const fetchUser = async () => {
  const response = await fetch(`http://localhost:5000/api/auth/me`, {
    headers: { Authorization: localStorage.getItem('accessToken') }
  });
  const data = await response.json();
  console.log('User data:', data);
  if (data.success) setUsername(data.response.name);
};

fetchMyProducts();
fetchUser();
}, 
[]);

  return (
    <>
      <Navbar />
      <Container>
        <Title> Hi, {username}! </Title>

<SectionGrid>
        <Section>
          <SectionTitle>My items</SectionTitle>
          <ProductList>
            {products.length === 0 && <p>You have no items yet.</p>}
            {products.map(product => (
              <ProductItem key={product._id}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.price} kr</ProductPrice>
                </ProductInfo>
              </ProductItem>
            ))}
          </ProductList>
        </Section>
        </SectionGrid>
      </Container>
    </>
  );
};