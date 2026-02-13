import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  gap: 40px;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.medium};
  margin: 0;
`;

const SearchBar = styled.input`
  padding: 8px 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.medium};
  width: 300px;
  margin-left: auto;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.text};
  padding: 8px 16px;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    border-color: ${props => props.theme.colors.accent};
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <LogoSection>
        <Logo>MANOMANO</Logo>
        <Subtitle>Browse through hand crafted items</Subtitle>
      </LogoSection>
       <SearchBar type="text" placeholder="Search..." />
      <NavLinks>
        <NavButton>Log in</NavButton>
        <NavButton>Sign up</NavButton>
      </NavLinks>
    </Nav>
  );
};