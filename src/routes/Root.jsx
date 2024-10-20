import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
  const isDarkTheme = theme === "dark";

  function toggleTheme() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  //   const [data, setData] = useState();

  //   useEffect(() => {
  //     async function dataFetch() {
  //       const data = await (
  //         await fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
  //       ).json();

  //       const onlyAwps = data.filter((skin) => skin.weapon.name === "AWP");

  //       setData(onlyAwps);
  //     }

  //     dataFetch();
  //   }, []);

  //   console.log(data);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <StyledApp>
        <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
        <h1>Current Theme: {theme}</h1>
        <Outlet />
      </StyledApp>
    </ThemeProvider>
  );
}
