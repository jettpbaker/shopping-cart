import styled from "styled-components";

const StoreHeading = styled.h1`
  color: ${({ theme }) => theme.colors.text}; /* Add a semicolon here */
  font-family: ${({ theme }) => theme.fonts.heading}; /* Add a semicolon here */
`;

export default function Store() {
  return (
    <>
      <h2>Store Page</h2>
    </>
  );
}
