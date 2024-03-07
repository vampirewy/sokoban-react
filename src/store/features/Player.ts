import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { type PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  x: number;
  y: number;
}

export interface PlayerState {
  player: Player;
}

const initialState: PlayerState = {
  player: { x: 1, y: 1 },
};

const PlayerReducer = createSlice({
  name: "player",
  initialState,
  reducers: {
    moveToRight: (state) => {
      state.player.x += 1;
    },
    moveToLeft: (state) => {
      state.player.x -= 1;
    },
    moveToTop: (state) => {
      state.player.y -= 1;
    },
    moveToDown: (state) => {
      state.player.y += 1;
    },
    resetPosition: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
  },
});

export const selectPlayer = (state: RootState): Player => state.player.player;

export const { moveToDown, moveToLeft, moveToRight, moveToTop, resetPosition } = PlayerReducer.actions;
export default PlayerReducer.reducer;
