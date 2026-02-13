import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 200px;
  margin-left: 380px;
  margin-bottom: 0px;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 100;
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 8px 15px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

export const FilterBar = () => {
  return (
    <FilterContainer>
      <div>
        <FilterLabel>ARTIST</FilterLabel>
        <Select>
          <option value="">All</option>
          <option value="artist1">Artist 1</option>
          <option value="artist2">Artist 2</option>
        </Select>
      </div>
      
      <div>
        <FilterLabel>TYPE</FilterLabel>
        <Select>
          <option value="">All</option>
          <option value="ceramics">Ceramics</option>
          <option value="textiles">Textiles</option>
          <option value="wood">Wood</option>
        </Select>
      </div>
      
      <div>
        <FilterLabel>COLOR</FilterLabel>
        <Select>
          <option value="">All</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </Select>
      </div>
    </FilterContainer>
  );
};