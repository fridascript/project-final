import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { Navbar } from "../components/Navbar";
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from "../tools/api";

//styled components
const Container = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  max-width: 1400px;
  margin: 0 auto;
`;

 const GridContainer = styled.div`
 max-width: 1100px;
 margin: 0 auto;
`;

 const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-top: 50px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 10px;
    row-gap: 30px;
  }
`;


export const Home = () => {
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

  const filteredProducts = products.filter(product => {
   const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesArtist = !selectedArtist || product.creator._id === selectedArtist;
  const matchesCategory = !selectedCategory || product.category === selectedCategory;
  const matchesColor = !selectedColor || product.color === selectedColor;
  return matchesSearch && matchesArtist && matchesCategory && matchesColor;
});

  return (
    <Container>
      <Navbar/>
      <FilterBar 
      products={products}
      onArtistChange={setSelectedArtist}
      onCategoryChange={setSelectedCategory}
      onColorChange={setSelectedColor}
      />
      <GridContainer>
      <Grid>
      {filteredProducts.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
      </Grid>
      </GridContainer>
    </Container>
  );
};