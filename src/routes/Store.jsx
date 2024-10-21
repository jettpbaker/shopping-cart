import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const StoreHeading = styled.h1`
  color: ${({ theme }) => theme.colors.text}; /* Add a semicolon here */
  font-family: ${({ theme }) => theme.fonts.heading}; /* Add a semicolon here */
`;

export default function Store() {
  const { awpData } = useOutletContext();
  const [awpDataLoaded, setAwpDataLoaded] = useState(
    awpData.classifiedGrade !== undefined
  );

  useEffect(() => {
    if (awpData.classifiedGrade !== undefined) {
      setAwpDataLoaded(true);
    }
  }, [awpData]);

  return (
    <>
      <h2>Store Page</h2>
      {!awpDataLoaded ? (
        <h3>Loading!</h3>
      ) : (
        <>
          <h3>Classified:</h3>
          <ul>
            {awpData.classifiedGrade.map((awp) => {
              console.log(awpData.classifiedGrade);
              console.log(awp.name);
              return (
                <li key={awp.id}>
                  {awp.name} | {awp.price}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
