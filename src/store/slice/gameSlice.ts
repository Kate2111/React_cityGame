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
  availableCities: string[];
  currentPlayer: PlayerTurn;
  cities: {
    player1: string[];
    player2: string[];
  };
  startValue: string;

  filteredCities: string[];
  delay: number;
  placeholder: string;
}

const initialState: GameState = {
  availableCities: [...initialCities],
  currentPlayer: PlayerTurn.FirstPlayer,
  cities: {
    player1: [],
    player2: [],
  },
  startValue: '',
  filteredCities: [],
  delay: 5000,
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
          state.currentPlayer = PlayerTurn.SecondPlayer;
          state.placeholder = 'Ожидаем ответа соперника...';
        }
      }
    },
    setFilteredCities: (state) => {
      if (!state.cities || !state.cities.player1 || state.cities.player1.length === 0) {
        return state;
      }
      const lastLetter = getLastLetter(state.cities.player1);
      state.filteredCities = state.availableCities.filter((city) => city.startsWith(lastLetter));
    },
    setDelay: (state) => {
      const filter = state.filteredCities.length;
      switch (true) {
        case filter < 20 && filter >= 13:
          state.delay = 20000;
          break;
        case filter < 13 && filter >= 7:
          state.delay = 60000;
          break;
        case filter >= 0 && filter < 7:
          state.delay = 120100;
          break;
        default:
          state.delay = 5000;
          break;
      }
    },
    secondPlayerMove: (state) => {
      const randomCity =
        state.filteredCities[Math.floor(Math.random() * state.filteredCities.length)];
      const placeholderMessage = `Знаете город на букву "${randomCity.slice(-1).toUpperCase()}"?`;

      const indexToRemove = state.availableCities.indexOf(randomCity);
      if (indexToRemove !== -1) {
        state.availableCities.splice(indexToRemove, 1);
        state.cities.player2.push(randomCity);
        state.currentPlayer = PlayerTurn.FirstPlayer;
        state.placeholder = placeholderMessage;
        state.filteredCities = [];
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
          break;

        default:
          if (indexToRemove !== -1) {
            state.availableCities.splice(indexToRemove, 1);
            state.cities.player1.push(submittedCity);
            state.placeholder = 'Ожидаем ответа соперника...';
            state.currentPlayer = PlayerTurn.SecondPlayer;
          }
          break;
      }
    },
  },
});

export const { startGame, setFilteredCities, setDelay, secondPlayerMove, submitCity } =
  gameSlice.actions;
export const gameState = (state: RootState) => state.games;
export default gameSlice.reducer;