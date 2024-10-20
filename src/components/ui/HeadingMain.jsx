import styled from "styled-components";
import PropTypes from "prop-types";

const NavHeading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: 4rem;
  width: max-content;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: color 0.75s ease;

  &:hover {
    color: ${({ $currentTheme }) =>
      $currentTheme === "light" ? "#e7eeea" : "#111814"};
  }

  &::after {
    content: "";
    background-color: ${({ theme }) => theme.colors.text};
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: -1rem;
    z-index: -1;
    transition: all 0.75s ease;
  }

  &:hover::after {
    width: calc(100% + 2rem);
  }
`;

const GradientText = styled.i`
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export default function HeadingMain({ currentTheme }) {
  return (
    <NavHeading $currentTheme={currentTheme}>
      Only<GradientText>AWPS</GradientText>
    </NavHeading>
  );
}

HeadingMain.propTypes = {
  currentTheme: PropTypes.string,
};
