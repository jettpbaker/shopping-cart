export default async function getAwpPrice(marketName, wear = "Factory New") {
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://steamcommunity.com/market/priceoverview/?country=AU&currency=1&appid=730&market_hash_name=${marketName}${
      wear === "" ? "" : "%20%28" + wear + "%29"
    }`
  )}`;

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
