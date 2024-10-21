import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import getAwpPrice from "../getAwpPrice";

const StyledStoreHeading = styled.header`
  margin-top: 5rem;
  height: 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function StoreHeading({ children }) {
  return <StyledStoreHeading>{children}</StyledStoreHeading>;
}

const StyledFilterButton = styled.button`
  background-color: ${(props) => props.$color};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 5px;
  padding: 0.8rem 3rem;

  display: flex;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;

  cursor: pointer;
`;

function FilterButton({ children, color, ...props }) {
  return (
    <StyledFilterButton $color={color} {...props}>
      {children}
    </StyledFilterButton>
  );
}

const StyledCardGridContainer = styled.main``;

function CardGridContainer({ children }) {
  return <StyledCardGridContainer>{children}</StyledCardGridContainer>;
}

const StyledCard = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 5rem;
  width: 23rem;
  height: 30rem;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledAwpName = styled.h3`
  color: ${({ theme }) => theme.colors.background};

  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 3rem;
`;
const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledAwpImg = styled.img`
  scale: 0.9;
  margin: 0rem 1rem;
  object-fit: contain;
`;
const StyledCardInfo = styled.div``;
const StyledCardButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 5px;
  padding: 1rem 2rem;

  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 2rem;

  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

function CardButton() {
  return <StyledCardButton>ADD TO CART</StyledCardButton>;
}

function Card({ awp }) {
  return (
    <StyledCard>
      <StyledAwpName>{awp.name.slice(6)}</StyledAwpName>
      <StyledImgContainer>
        <StyledAwpImg src={awp.image}></StyledAwpImg>
      </StyledImgContainer>
      <StyledCardInfo>
        <CardButton></CardButton>
      </StyledCardInfo>
    </StyledCard>
  );
}

export default function Store() {
  const { awpData } = useOutletContext();
  const [awpDataLoaded, setAwpDataLoaded] = useState(
    awpData.classifiedGrade !== undefined
  );
  const [openTab, setOpenTab] = useState("milSpecGrade");
  const currentAwps = awpData[openTab];

  useEffect(() => {
    if (currentAwps !== undefined) {
      console.log("Running price effect!");
      const getPrices = async () => {
        for (const awp of currentAwps) {
          try {
            const price = await getAwpPrice(awp.name);
            awp.price = price;
          } catch (error) {
            // console.error(`Failed to fetch price for ${awpName}:`, error);
            awp.price = "No price found!";
          }
        }
      };

      // getPrices();
    }
  }, [openTab]);

  console.log(currentAwps);

  function handleSetOpenTab(e) {
    console.log(e.target.id);
    const newOpenTab = e.target.id;
    setOpenTab(newOpenTab);
  }

  useEffect(() => {
    if (awpData.classifiedGrade !== undefined) {
      setAwpDataLoaded(true);
    }
  }, [awpData]);

  return (
    <>
      <StoreHeading>
        <FilterButton
          color="#4b69ff"
          id="milSpecGrade"
          onClick={handleSetOpenTab}
        >
          Mil-Spec
        </FilterButton>
        <FilterButton
          color="#5e98d9"
          id="industrialGrade"
          onClick={handleSetOpenTab}
        >
          Industrial
        </FilterButton>
        <FilterButton
          color="#8847ff"
          id="restrictedGrade"
          onClick={handleSetOpenTab}
        >
          Restricted
        </FilterButton>
        <FilterButton
          color="#d32ce6"
          id="classifiedGrade"
          onClick={handleSetOpenTab}
        >
          Classified
        </FilterButton>
        <FilterButton
          color="#eb4b4b"
          id="covertGrade"
          onClick={handleSetOpenTab}
        >
          Covert
        </FilterButton>
      </StoreHeading>
      {!awpDataLoaded ? (
        <h3>Loading!</h3>
      ) : (
        <>
          <CardGridContainer>
            {currentAwps.map((awp) => {
              return <Card key={awp.id} awp={awp}></Card>;
            })}
          </CardGridContainer>
        </>
      )}
    </>
  );
}
