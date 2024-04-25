import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface EditPlayerState {
  player: { x: number; y: number };
}

const initialState: EditPlayerState = {
  player: { x: -1, y: -1 },
};

const EditPlayerReducer = createSlice({
  name: 'editPlayer',
  initialState,
  reducers: {
    storeUpdatePlayer: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.player = action.payload;
    },
    storeRemovePlayer: (state) => {
      state.player.x = -1;
      state.player.y = -1;
    },
  },
});

export const { storeUpdatePlayer, storeRemovePlayer } = EditPlayerReducer.actions;

export const selectEditPlayer = (state: RootState) => state.editPlayer.player;

export default EditPlayerReducer.reducer;
