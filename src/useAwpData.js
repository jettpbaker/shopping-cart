import { useState, useEffect } from "react";

export default function useAwpData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (
          await fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
        ).json();

        const awps = data.filter((skin) => skin.weapon.name === "AWP");
        setData(awps);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, error, loading };
}
