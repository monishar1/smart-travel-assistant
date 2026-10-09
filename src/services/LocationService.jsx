const getLocation = async (city) => {

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const response = await fetch(url);

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Location not found");
  }

  return data.results[0];
};

export default getLocation;