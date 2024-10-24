import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import "../index.css";
import { useEffect, useState } from "react";

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

  transition: color 0.5s ease, background-color 0.5s ease;
`;

const StyledHomeTextContainer = styled.div``;

const StyledHomeText = styled.p`
  color: ${({ $currentTheme }) =>
    $currentTheme === "light" ? "#f3f6f4" : "#090c0a"};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: bold;
  font-size: 5rem;

  transition: color 0.5s ease;
`;

const StyledQuickBuyContainer = styled.section`
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledQuickBuyHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 4rem;
`;

const QuickBuyCard = styled.div``;

const StyledButtonSection = styled.section`
  display: flex;
  gap: 2rem;
`;

const QuickBuyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 5px;
  padding: 0.8rem 3rem;

  display: flex;
  align-items: center;

  width: 50%;

  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;

  cursor: pointer;
`;

const StyledNextButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 5px;
  padding: 0.8rem 3rem;

  width: 50%;

  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  cursor: pointer;
`;

function QuickBuyContainer({
  randomAwp,
  awpDataLoaded,
  setGetNewAwp,
  increaseCartCount,
}) {
  return (
    <StyledQuickBuyContainer>
      <StyledQuickBuyHeading>Quick Buy</StyledQuickBuyHeading>
      <QuickBuyCard>
        {awpDataLoaded ? <img src={randomAwp.image} alt="" /> : null}
        <StyledButtonSection>
          <QuickBuyButton onClick={increaseCartCount}>
            ADD TO CART
          </QuickBuyButton>
          <StyledNextButton onClick={() => setGetNewAwp((prev) => !prev)}>
            NEXT
          </StyledNextButton>
        </StyledButtonSection>
      </QuickBuyCard>
    </StyledQuickBuyContainer>
  );
}

function HomeContainer({ children }) {
  return (
    <>
      <StyledHomeContainer>{children}</StyledHomeContainer>
    </>
  );
}

const StyledCreditContainer = styled.footer`
  display: flex;

  background-color: ${({ theme }) => theme.colors.secondary};
  max-height: 100vh;
  overflow: hidden;

  width: 100vw;
  margin-top: 5rem;
  margin-left: -4rem;

  padding: 2rem;
`;

const StyledCreditTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFooterHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.7rem;

  margin-bottom: 5rem;
`;

const StyledFooterText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
`;

function CreditContainer() {
  return (
    <StyledCreditContainer>
      <img
        src="public/images/HoldingAWP.png"
        alt="Person holding AWP"
        className="heroImg"
        style={{
          transform: "scaleX(-1) translateY(2rem) translateX(2rem)",
          marginLeft: "1rem",
        }}
      />
      <StyledCreditTextContainer>
        <StyledFooterHeader>
          This demo website was made as one of the projects in{" "}
          <a href="https://www.theodinproject.com"> The Odin Project</a>
        </StyledFooterHeader>
        <StyledFooterText>
          Credit to <a href="https://github.com/ByMykel/CSGO-API">this</a>{" "}
          github repository for the images fetched by the site.
        </StyledFooterText>
        <StyledFooterText>
          The site was made using React, React Router, Styled Components and
          Vite :)
        </StyledFooterText>
        <StyledFooterText style={{ marginTop: "3rem" }}>
          Unfortunately I was not able to fetch prices for each AWP because of
          rate limits on the API,
          <br /> as well as issues with CORS. I don&apos;t believe this impacts
          the point of this project much, <br />
          as it was primarily to learn the basics of React Router.
        </StyledFooterText>
      </StyledCreditTextContainer>
    </StyledCreditContainer>
  );
}

export default function Home() {
  const { theme, awpData, increaseCartCount } = useOutletContext();
  const [randomAwp, setRandomAwp] = useState("");
  const [getNewAwp, setGetNewAwp] = useState(false);

  const awpDataLoaded = Object.keys(awpData).length !== 0;

  useEffect(() => {
    if (awpDataLoaded) {
      const randomGradeNum = Math.floor(
        Math.random() * Object.keys(awpData).length
      );

      const awpDataArray = Object.entries(awpData);
      const randomGrade = awpDataArray[randomGradeNum][1];

      const randomAwp =
        randomGrade[Math.floor(Math.random() * randomGrade.length)];

      setRandomAwp(randomAwp);
    }
  }, [awpDataLoaded, awpData, getNewAwp]);

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
            // style={{
            //   filter: "drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.4))",
            // }}
            className="heroImg"
          />
        </StyledHomeContainerHero>
        <QuickBuyContainer
          randomAwp={randomAwp}
          awpDataLoaded={awpDataLoaded}
          setGetNewAwp={setGetNewAwp}
          increaseCartCount={increaseCartCount}
        ></QuickBuyContainer>
        <CreditContainer>CreditContainer</CreditContainer>
      </HomeContainer>
    </>
  );
}

HomeContainer.propTypes = {
  children: PropTypes.node,
};

QuickBuyContainer.propTypes = {
  randomAwp: PropTypes.string,
  awpDataLoaded: PropTypes.bool,
  setGetNewAwp: PropTypes.func,
  increaseCartCount: PropTypes.func,
};
