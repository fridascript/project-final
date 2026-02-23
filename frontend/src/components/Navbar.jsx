import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styling for component
const MobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  padding: 60px 20px 20px;
  gap: 20px;
  z-index: 100;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
  
  span {
    width: 25px;
    height: 3px;
    background-color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
  }
`;

const CloseButton = styled.button`
 position:absolute;
 top: 20px;
 right: 20px;
 background: none;
 border:none;
 font-size: 24px;
 cursor: pointer;
 color: ${props => props.theme.colors.text};
`;

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
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: none;
  gap: 20px;
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
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

const LogoutButton = styled(NavButton)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border-color: ${props => props.theme.colors.accent};

   &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const MessagesLink = styled(NavButton)`
  background: none;
  border: none;
  font-weight: bold;
`;

const Dropdown = styled.div`
  position: relative;
  
  &:hover > div {
    display: flex;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 8px;
  gap: 4px;
  z-index: 100;
  min-width: 150px;
`;

const DropdownItem = styled(NavButton)`
  border: none;
  text-align: left;
  width: 100%;
`;

const Username = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-weight: bold;
  cursor: pointer;
`;


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const navigate = useNavigate ();

  return (
    <>
    <Nav>
      <LogoSection>
        <Logo>MANOMANO</Logo>
        <Subtitle>Browse through hand crafted items</Subtitle>
      </LogoSection>
       
      <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

       {!isLoggedIn && <SearchBar type="text" placeholder="Search..." />}

    <NavLinks>
  {isLoggedIn ? (
    <>
      <MessagesLink onClick={() => navigate('/messages')}>Messages</MessagesLink>
      <Dropdown>
        <Username> menu ▾</Username>
        <DropdownMenu>
          <DropdownItem onClick={() => navigate('/dashboard')}>My items</DropdownItem>
          <DropdownItem onClick={() => navigate('/post-item')}>Post new item</DropdownItem>
          <DropdownItem onClick={() => navigate('/account')}>My account</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <LogoutButton onClick={() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/');
      }}>Log out</LogoutButton>
    </>
  ) : (
    <>
      <NavButton onClick={() => navigate('/login')}>Log in</NavButton>
      <NavButton onClick={() => navigate('/register')}>Sign up</NavButton>
    </>
  )}
</NavLinks>
</Nav>

<MobileMenu isOpen={isMenuOpen}>
  <CloseButton onClick={() => setIsMenuOpen(false)}>X</CloseButton>
  {isLoggedIn ? (
    <LogoutButton onClick={() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      navigate('/');
      setIsMenuOpen(false);
    }}>Log out</LogoutButton>
  ) : (
    <>
      <NavButton onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Log in</NavButton>
      <NavButton onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>Sign up</NavButton>
    </>
  )}
</MobileMenu>
  </>
  );
};