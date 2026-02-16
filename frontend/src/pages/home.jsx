import { useState, useEffect } from "react";
import styled from "styled-components";
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
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 30px;
  margin-top: 80px;

`;


export const Home = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    
    getProducts();
  }, []);

  return (
    <Container>
      <Navbar/>
      <FilterBar />
      <GridContainer>
      <Grid>
      {products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
      </Grid>
      </GridContainer>
    </Container>
  );
};