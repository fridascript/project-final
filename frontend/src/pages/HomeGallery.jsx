import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { Navbar } from "../components/Navbar";
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from "../tools/api";

const Container = styled.div`
  padding: 0px;
  background-color: ${props => props.theme.colors.background};

`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 30px 10px 100px 10px;
  

 

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    align-items: flex-start;
    height: 700px;
    gap: 20px;
    padding: 70px 20px 100px 60px;
  }

  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 4px;
  }
`;

const CardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['offset', 'offsetX', 'mobileOffset'].includes(prop)
})`
  width: 100%;
  margin-top: ${props => props.mobileOffset}px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 260px;
    margin-top: ${props => props.offset}px;
    margin-left: ${props => props.offsetX}px;
  }
`;

const positions = [
  { y: 0, x: 0, mobileOffset: 0 },
  { y: 120, x: 20, mobileOffset: 40 },
  { y: 40, x: 0, mobileOffset: 0 },
  { y: 200, x: 30, mobileOffset: 60 },
  { y: 20, x: 10, mobileOffset: 20 },
  { y: 160, x: 0, mobileOffset: 0 },
  { y: 80, x: 25, mobileOffset: 50 },
  { y: 240, x: 15, mobileOffset: 30 },
  { y: 10, x: 0, mobileOffset: 0 },
  { y: 180, x: 20, mobileOffset: 40 },
  { y: 60, x: 30, mobileOffset: 10 },
  { y: 220, x: 0, mobileOffset: 0 },
  { y: 100, x: 10, mobileOffset: 60 },
  { y: 140, x: 25, mobileOffset: 20 },
  { y: 30, x: 0, mobileOffset: 0 },
];

export const HomeGallery = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('search') || '';
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArtist = !selectedArtist || product.creator._id === selectedArtist;
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesColor = !selectedColor || product.color === selectedColor;
      return matchesSearch && matchesArtist && matchesCategory && matchesColor;
    });
  }, [products, searchTerm, selectedArtist, selectedCategory, selectedColor]);

  return (
    <Container>
      <Navbar/>
      <main>
        <FilterBar 
          products={products}
          onArtistChange={setSelectedArtist}
          onCategoryChange={setSelectedCategory}
          onColorChange={setSelectedColor}
        />
        <GalleryContainer>
          {filteredProducts.map((product, index) => {
            const pos = positions[index % positions.length];
            return (
              <CardWrapper key={product._id} offset={pos.y} offsetX={pos.x} mobileOffset={pos.mobileOffset}>
                <ProductCard product={product} />
              </CardWrapper>
            );
          })}
        </GalleryContainer>
      </main>
    </Container>
  );
};