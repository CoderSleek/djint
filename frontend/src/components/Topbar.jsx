import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function TopBar(props) {
  const isLoggedIn = props.cookie;

  const renderLoginButton = () => (
    <>
      <ButtonLink to="/login">Login</ButtonLink>
      <ButtonLink to="/signup">Signup</ButtonLink>
    </>
  );

  

  const renderLogoutButton = () => (
    <LogoutButton>Signout</LogoutButton>
  );

  return (
    <TopBarContainer>
      <ButtonContainer>
        <li><ButtonLink to="/">Global</ButtonLink></li>
        {isLoggedIn && <li><UserButton to="/user">User</UserButton></li>}
      </ButtonContainer>
      <ButtonContainer className='sign'>
        {!isLoggedIn && <li>{renderLoginButton()}</li>}
        {isLoggedIn && <li>{renderLogoutButton()}</li>}
      </ButtonContainer>
    </TopBarContainer>
  );
}

const TopBarContainer = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
  padding: 10px;
  background-color: #FFFFFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 30px;
`;

const ButtonContainer = styled.ul`
	display: flex;
  list-style: none;
  margin: auto;
  margin: 0;
  padding: 0;

  &.sign {
	position: absolute;
	right: 0px;
  }
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 18px;
`;

const UserButton = styled(ButtonLink)`
  margin-left: 0;
  margin-right: 0;
`;

export default TopBar;
