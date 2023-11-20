export const getLastLetter = (citiesArray: string[]): string => {
  const lastCity = citiesArray[citiesArray.length - 1];
  let lastLetter = lastCity[lastCity.length - 1];

  if (lastLetter === 'ь' || lastLetter === 'ъ') {
    lastLetter = lastCity[lastCity.length - 2];
  }

  return lastLetter.toUpperCase();
};

export const getSubmittedCity = (city: string): string => {
  return city.trim().charAt(0).toUpperCase() + city.slice(1);
};
