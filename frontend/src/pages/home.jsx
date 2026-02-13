import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';

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
  return (
    <Container>
      <Navbar/>
      <FilterBar />
      <GridContainer>
      <Grid>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      </Grid>
      </GridContainer>
    </Container>
  );
};