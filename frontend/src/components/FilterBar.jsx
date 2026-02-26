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