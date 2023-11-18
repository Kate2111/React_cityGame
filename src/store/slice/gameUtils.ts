export const chooseRandomCity = (lastCity: string, availableCities: string[]): string => {
  const lastLetter = lastCity[lastCity.length - 1];
  const filteredCities = availableCities.filter((city) => city.startsWith(lastLetter));

  return filteredCities[Math.floor(Math.random() * filteredCities.length)];
};

export const getLastLetter = (citiesArray: string[]): string => {
  const lastCity = citiesArray[citiesArray.length - 1];
  let lastLetter = lastCity[lastCity.length - 1];

  if (lastLetter === 'ь' || lastLetter === 'ъ') {
    lastLetter = lastCity[lastCity.length - 2];
  }

  return lastLetter;
};
