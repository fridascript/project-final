import styled from "styled-components";

const Card = styled.div`
border: 1px solid black;
border-radius: 4px;
padding: 6px;
max-width: 250px;
display:flex;
flex-direction: column;
align-items: left;
cursor: pointer;

&:hover {
    transform: translateY(-5px);
    border: 2px solid ${props => props.theme.colors.accent};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #c4c1c1;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 8px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.text};
`;

const Artist = styled.p`
  margin: 4px;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.small};
  font-family: ${props => props.theme.fonts.body};
`;

const Price = styled.p`
  margin: 8px;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.small};
  font-family: ${props => props.theme.fonts.body};
`;



export const ProductCard = () => {
  return (
    <Card>
      <ImagePlaceholder />
      <Title>Product: </Title>
      <Artist>Artist: </Artist>
      <Price>xx kr</Price>
    </Card>
  );
};