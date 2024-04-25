import type { PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][];

interface MapState {
  map: Map;
}

const initialState: MapState = {
  map: [],
};

const MapReducer = createSlice({
  name: 'map',
  initialState,
  reducers: {
    storeSetupMap: (state, action: PayloadAction<Map>) => {
      state.map = action.payload;
    },
  },
});

export const selectMap = (state: RootState): Map => state.map.map;

export const { storeSetupMap } = MapReducer.actions;

export default MapReducer.reducer;
