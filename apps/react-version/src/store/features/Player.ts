import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '../store';

export interface Player {
  x: number;
  y: number;
}

export interface PlayerState {
  player: Player;
}

const initialState: PlayerState = {
  player: { x: 0, y: 0 },
};

const PlayerReducer = createSlice({
  name: 'player',
  initialState,
  reducers: {
    moveDistance: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.player.x += action.payload.x;
      state.player.y += action.payload.y;
    },
    resetPosition: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
  },
});

export const selectPlayer = (state: RootState): Player => state.player.player;

export const { moveDistance, resetPosition } = PlayerReducer.actions;
export default PlayerReducer.reducer;
