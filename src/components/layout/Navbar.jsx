import styled from "styled-components";
import PropTypes from "prop-types";
import HeadingMain from "../ui/HeadingMain";
import NavMain from "../ui/NavMain";
import ToggleTheme from "../ui/ToggleTheme";
import CartIcon from "../ui/CartIcon";

const NavbarBody = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavEnd = styled.div`
  display: flex;
`;

const NavHr = styled.hr`
  border: 0;
  height: 2px;

  background-color: ${({ theme }) => theme.colors.text};

  margin: 0.2rem 0rem;
`;

export default function Navbar({ toggleTheme, currentTheme }) {
  return (
    <>
      <NavbarBody>
        <HeadingMain currentTheme={currentTheme} />
        <NavMain></NavMain>
        <NavEnd>
          <CartIcon currentTheme={currentTheme} />
          <ToggleTheme currentTheme={currentTheme} toggleTheme={toggleTheme} />
        </NavEnd>
      </NavbarBody>

      <NavHr></NavHr>
    </>
  );
}

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.string,
};
