import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gameSlice from './slice/gameSlice';
import timerSlice from './slice/timerSlice';

export const store = configureStore({
  reducer: {
    games: gameSlice,
    timer: timerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
