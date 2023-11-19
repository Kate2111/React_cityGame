export const getLastLetter = (citiesArray: string[]): string => {
  const lastCity = citiesArray[citiesArray.length - 1];
  let lastLetter = lastCity[lastCity.length - 1];

  if (lastLetter === 'ь' || lastLetter === 'ъ') {
    lastLetter = lastCity[lastCity.length - 2];
  }

  return lastLetter;
};

/* interface UpdateGameStateProps {
  citiesArray: string[];
  titleCity: string;
  citiesPlayer: string[];
  currentPlayer: string;
  placeholder: string;
  placeholderValue: string;
  timer: number;
}

export const updateGameStateAfterPlayerMove = (props: UpdateGameStateProps): void => {
  const indexToRemove = props.citiesArray.indexOf(props.titleCity);
  if (indexToRemove !== -1) {
    props.citiesArray.splice(indexToRemove, 1);
    props.citiesPlayer.push(props.titleCity);
    props.placeholder = props.placeholderValue;
    props.timer = 120;
    props.currentPlayer === PlayerTurn.FirstPlayer
      ? (props.currentPlayer = PlayerTurn.SecondPlayer)
      : (props.currentPlayer = PlayerTurn.FirstPlayer);
  }
};
 */
