import styled from "styled-components";
import PropTypes from "prop-types";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

const StyledIcon = styled.div`
  display: flex;
  transition: all 0.5s ease;
  transform: rotate(${({ $rotate }) => ($rotate ? "180deg" : "0deg")});
  color: ${({ theme }) => theme.colors.text};
`;

const StyledToggleTheme = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ToggleTheme({ toggleTheme, currentTheme }) {
  return (
    <StyledToggleTheme onClick={toggleTheme}>
      <StyledIcon $rotate={currentTheme === "dark"}>
        {currentTheme === "dark" ? <Sun size={50} /> : <Moon size={50} />}
      </StyledIcon>
    </StyledToggleTheme>
  );
}

ToggleTheme.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.string,
};
