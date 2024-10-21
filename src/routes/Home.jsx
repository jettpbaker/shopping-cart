import { Children } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const StyledHomeContainer = styled.main`
  height: 100%;
  width: auto;
`;

const StyledHomeContainerHero = styled.section`
  width: 100vw;
  margin-top: 5rem;
  margin-left: -4rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  gap: 5rem;

  background-color: ${({ theme }) => theme.colors.primary};

  transition: all 0.5s ease;
`;

const StyledHomeTextContainer = styled.div``;

const StyledHomeText = styled.p`
  color: ${({ $currentTheme }) =>
    $currentTheme === "light" ? "#f3f6f4" : "#090c0a"};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: bold;
  font-size: 5rem;
`;

function HomeContainer({ children }) {
  return <StyledHomeContainer>{children}</StyledHomeContainer>;
}

export default function Home() {
  const theme = useOutletContext();
  console.log(theme);
  return (
    <>
      <HomeContainer>
        <StyledHomeContainerHero>
          <StyledHomeTextContainer>
            <StyledHomeText $currentTheme={theme}>
              The one stop shop <br></br>for all things <u>AWP</u>
            </StyledHomeText>
          </StyledHomeTextContainer>
          <img
            src="src/assets/images/HoldingAWP.png"
            alt="Person holding AWP"
          />
        </StyledHomeContainerHero>
      </HomeContainer>
    </>
  );
}
