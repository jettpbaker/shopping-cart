import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAwpData from "../useAwpData";
import getAwpPrice from "../getAwpPrice";
import Navbar from "../components/layout/Navbar";

// Themes:

const lightTheme = {
  colors: {
    text: "#111814",
    background: "#f3f6f4",
    primary: "#364e40",
    secondary: "#9aa2b7",
    accent: "#5d597d",
  },
  fonts: {
    main: "Supreme, sans-serif",
    mainItalic: "SupremeItalic, sans-serif",
    heading: "Recia, serif",
    headingItalic: "ReciaItalic, serif",
  },
};

const darkTheme = {
  colors: {
    text: "#e7eeea",
    background: "#090c0a",
    primary: "#b1c9bb",
    secondary: "#485065",
    accent: "#8682a6",
  },
  fonts: {
    main: "Supreme, sans-serif",
    mainItalic: "SupremeItalic, sans-serif",
    heading: "Recia, serif",
    headingItalic: "ReciaItalic, serif",
  },
};

const StyledApp = styled.div`
  padding: 2rem 4rem;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.25s ease;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function Root() {
  const [theme, setTheme] = useState("light");
  const { data, error, loading } = useAwpData();
  const [awpData, setAwpData] = useState({});
  const isDarkTheme = theme === "dark";

  function toggleTheme() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function addAwpPrices(data) {
    if (!data) return;

    for (const awp of data) {
      const awpName = awp.name;
      try {
        const price = await getAwpPrice(awpName);
        awp.price = price;
      } catch (error) {
        // console.error(`Failed to fetch price for ${awpName}:`, error);
        awp.price = "No price found!";
      }

      await delay(5000);
    }
    sortAwpData(data);
  }

  async function sortAwpData(data) {
    if (!data) return;

    const allAwps = {
      industrialGrade: [],
      milSpecGrade: [],
      restrictedGrade: [],
      classifiedGrade: [],
      covertGrade: [],
    };

    data.forEach((awp) => {
      const awpRarity = awp.rarity.name;

      switch (awpRarity) {
        case "Industrial Grade":
          allAwps.industrialGrade.push(awp);
          break;

        case "Mil-Spec Grade":
          allAwps.milSpecGrade.push(awp);
          break;

        case "Restricted":
          allAwps.restrictedGrade.push(awp);
          break;

        case "Classified":
          allAwps.classifiedGrade.push(awp);
          break;

        case "Covert":
          allAwps.covertGrade.push(awp);
          break;

        default:
          console.log(`Unknown rarity: ${awpRarity}`);
          break;
      }
    });

    setAwpData(allAwps);
  }

  useEffect(() => {
    if (data) {
      addAwpPrices(data);
      // sortAwpData(data);
    }
  }, [data]);

  const contextValue = {
    theme: theme,
    awpData: awpData,
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <StyledApp>
        <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
        <Outlet context={contextValue} />
      </StyledApp>
    </ThemeProvider>
  );
}
