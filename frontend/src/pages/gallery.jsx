import { useState, useEffect } from 'react';
import { API_URL } from '../tools/config';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderWrapper = styled.div`
  position: relative;
  margin-bottom: 70px;
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
  opacity: 50%;
  margin-top: 10px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const ArtistSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.accent};
  flex-shrink: 0; 
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ArtistName = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: bold;
  margin: 0;
  font-size: ${props => props.theme.fontSizes.large};
`;

const Bio = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  font-size: ${props => props.theme.fontSizes.medium};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
  margin-top: 150px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border: 1px solid #460202;;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 8px 12px;
`;

const ProductTitle = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: ${props => props.theme.fontSizes.medium};
`;

const ProductPrice = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 4px 0 0;
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const Gallery = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch(`${API_URL}/api/auth/user/${userId}`);
      const data = await response.json();
      if (data.success) setArtist(data.response);
    };

    const fetchProducts = async () => {
      const response = await fetch(`${API_URL}/api/products?userId=${userId}`);
      const data = await response.json();
      if (data.success) setProducts(data.response);
    };

    fetchArtist();
    fetchProducts();
  }, [userId]);

  if (!artist) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <HeaderWrapper>
        <HeaderImage src={artist.headerImage} />
        <ArtistSection>
          {artist.profileImage && (
            <ProfileImage src={artist.profileImage} alt={artist.name} />
          )}
          <ArtistInfo>
            <ArtistName>{artist.name}</ArtistName>
            {artist.bio && <Bio>{artist.bio}</Bio>}
          </ArtistInfo>
        </ArtistSection>
      </HeaderWrapper>

      <Container>
        <ProductsGrid>
          {products.map(product => (
            <ProductCard key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>{product.price} kr</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </>
  );
};