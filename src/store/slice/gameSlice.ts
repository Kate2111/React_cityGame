import initialCities from '@/constant/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getLastLetter } from './gameUtils';
//import { chooseRandomCity } from './gameUtils';

enum PlayerTurn {
  FirstPlayer = 'Сейчас ваша очередь',
  SecondPlayer = 'Сейчас очередь соперника',
}

interface GameState {
  cities: {
    player1: string[];
    player2: string[];
  };
  availableCities: string[];
  startValue: string;
  currentPlayer: PlayerTurn;
  timer: number;
  placeholder: string;
}

const initialState: GameState = {
  cities: {
    player1: [],
    player2: [],
  },
  availableCities: [...initialCities],
  startValue: '',
  currentPlayer: PlayerTurn.FirstPlayer,
  timer: 120,
  placeholder: 'Напишите любой город, например: Где вы живете?',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<string>) => {
      const submittedCity = action.payload.trim().toLowerCase();
      const isValidFirstCity = state.availableCities.includes(submittedCity);

      if (isValidFirstCity) {
        state.startValue = action.payload;
        const indexToRemove = state.availableCities.indexOf(submittedCity);
        if (indexToRemove !== -1) {
          state.availableCities.splice(indexToRemove, 1);
          state.cities.player1.push(submittedCity);
          state.timer = 120;
          state.currentPlayer = PlayerTurn.SecondPlayer;
          state.placeholder = 'Ожидаем ответа соперника...';
        }
      }
    },
    endGame: () => {
      alert('Время вышло');
    },
    secondPlayerMove: (state) => {
      if (!state.cities || !state.cities.player1 || state.cities.player1.length === 0) {
        return state;
      }

      const lastLetter = getLastLetter(state.cities.player1);

      const filteredCities = state.availableCities.filter((city) => city.startsWith(lastLetter));
      const randomCity = filteredCities[Math.floor(Math.random() * filteredCities.length)];

      const indexToRemove = state.availableCities.indexOf(randomCity);
      if (indexToRemove !== -1) {
        state.availableCities.splice(indexToRemove, 1);
        state.cities.player2.push(randomCity);
        state.timer = 120;
        state.currentPlayer = PlayerTurn.FirstPlayer;
        state.placeholder = `Знаете город на букву "${randomCity.charAt(0).toUpperCase()}"?`;
      }
    },
    submitCity: (state, action: PayloadAction<string>) => {
      if (!state.cities || !state.cities.player2 || state.cities.player2.length === 0) {
        return state;
      }

      const submittedCity = action.payload.trim().toLowerCase();
      const lastLetter = getLastLetter(state.cities.player2);
      const indexToRemove = state.availableCities.indexOf(submittedCity);

      switch (true) {
        case submittedCity.charAt(0) !== lastLetter:
          alert(`Введи город на букву "${lastLetter.toUpperCase()}"`);
          break;

        case !state.availableCities.includes(submittedCity):
          alert('Такого города нет. Теперь ход соперника!');
          state.currentPlayer = PlayerTurn.SecondPlayer;
          state.timer = 120;
          state.placeholder = 'Ожидаем ответа соперника...';
          break;

        default:
          if (indexToRemove !== -1) {
            state.availableCities.splice(indexToRemove, 1);
            state.cities.player1.push(submittedCity);
            state.timer = 120;
            state.currentPlayer = PlayerTurn.SecondPlayer;
          }
          break;
      }
    },
  },
});

export const { startGame, endGame, secondPlayerMove, submitCity } = gameSlice.actions;
export const gameState = (state: RootState) => state.games;
export default gameSlice.reducer;
