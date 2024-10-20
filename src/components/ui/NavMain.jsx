import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StyledNavMain = styled.div`
  display: flex;
  gap: 3rem;
`;

const StyledNavLink = styled(Link)`
  text-decoration: none;
  position: relative;
  width: max-content;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 3rem;
  transition: all 0.2s ease-in-out;

  &::after {
    content: "";
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    position: absolute;
    width: 0%;
    height: 0.3rem;
    bottom: 5px;
    left: 0;
    transition: all 0.5s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavLink = ({ to, children }) => {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
};

export default function NavMain() {
  return (
    <StyledNavMain>
      <NavLink to="/store">Store</NavLink>
      <NavLink to="/">Home</NavLink>
    </StyledNavMain>
  );
}

NavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
};
