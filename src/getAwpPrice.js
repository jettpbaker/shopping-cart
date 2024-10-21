export default async function getAwpPrice(marketName) {
  const encodedName = encodeURIComponent(marketName);

  const steamURL = `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${encodedName}`;
  const url = `https://api.allorigins.win/get?url=${steamURL}%20%28Field-Tested%29`;

  console.log(url);

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error("The request could not be completed");
    const data = await response.json();

    const contents = JSON.parse(data.contents);
    return contents.lowest_price || contents.median_price || "No price found!";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=AK-47%20%7C%20Redline%20%28Field-Tested%29
// https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=AWP%20%7C%20Snake%20Camo%20%28Field-Tested%29
