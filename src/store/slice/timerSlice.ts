import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TimerState {
  timer: number;
}

const initialState: TimerState = {
  timer: 120,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementTimer: (state) => {
      state.timer = Math.max(0, state.timer - 1);
    },
    resetTimer: (state) => {
      state.timer = 120;
    },
  },
});

export const { decrementTimer, resetTimer } = timerSlice.actions;
export const timerState = (state: RootState) => state.timer;
export default timerSlice.reducer;
