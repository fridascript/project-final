import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin-top: 150px;
  margin-bottom: 0px;
  align-items: stretch;
  border-radius: 8px;
  padding: 20px;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterLabel = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 100;
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 10px 10px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  width: 100%;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: auto;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

export const FilterBar = ({ products = [], onArtistChange, onCategoryChange, onColorChange }) => {
  
  
  const artists = [...new Map(products
    .filter(p => p.creator)
    .map(p => [p.creator._id, p.creator])
  ).values()];

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const colors = [...new Set(products.map(p => p.color).filter(Boolean))];

  return (
    <FilterContainer>
      <div>
        <FilterLabel>ARTIST</FilterLabel>
        <Select onChange={(e) => onArtistChange(e.target.value)}>
          <option value="">All</option>
          {artists.map(artist => (
            <option key={artist._id} value={artist._id}>{artist.name}</option>
          ))}
        </Select>
      </div>
      
      <div>
        <FilterLabel>TYPE</FilterLabel>
        <Select onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
      </div>
      
      <div>
        <FilterLabel>COLOR</FilterLabel>
        <Select onChange={(e) => onColorChange(e.target.value)}>
          <option value="">All</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </Select>
      </div>
    </FilterContainer>
  );
};