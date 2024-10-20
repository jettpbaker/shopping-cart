import styled from "styled-components";
import PropTypes from "prop-types";
import { ShoppingCart } from "lucide-react";

const StyledIconButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: color 0.75s ease;
  color: ${({ theme }) => theme.colors.text};

  margin-right: 28px;
`;

const StyledCartInfo = styled.div`
  background-color: ${({ $currentTheme }) =>
    $currentTheme === "light" ? "#f3f6f4" : "#090c0a"};

  color: ${({ theme }) => theme.colors.text};

  width: 28px;
  height: 28px;
  border-radius: 100%;
  box-shadow: 1.5px 1.5px 2px ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: bold;
  font-size: 1.5rem;

  z-index: 1;
  position: relative;
  transform: translate(60px, -15px);

  transition: all 0.5s ease;
`;

const CartInfo = ({ $currentTheme }) => {
  return <StyledCartInfo $currentTheme={$currentTheme}>1</StyledCartInfo>;
};

export default function CartIcon({ currentTheme }) {
  return (
    <StyledIconButton>
      <CartInfo $currentTheme={currentTheme}></CartInfo>

      <ShoppingCart size={50}></ShoppingCart>
    </StyledIconButton>
  );
}

CartInfo.propTypes = {
  $currentTheme: PropTypes.string,
};

CartIcon.propTypes = {
  currentTheme: PropTypes.string,
};
