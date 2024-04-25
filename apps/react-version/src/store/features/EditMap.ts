import type { PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][];

interface EditMapState {
  map: Map;
  row: string;
  col: string;
}

const initialState: EditMapState = {
  map: [],
  row: '8',
  col: '8',
};

const EditMapReducer = createSlice({
  name: 'editMap',
  initialState,
  reducers: {
    storeInitMap: (state, action: PayloadAction<Map>) => {
      state.map = action.payload;
    },
    storeSetWallInMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.map[action.payload.y][action.payload.x] = MapTile.WALL;
    },
    storeSetFloorInMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.map[action.payload.y][action.payload.x] = MapTile.FLOOR;
    },
    storeSetRow: (state, action: PayloadAction<string>) => {
      state.row = action.payload;
    },
    storeSetCol: (state, action: PayloadAction<string>) => {
      state.col = action.payload;
    },
    storeIncreaseMapRow: (state, action: PayloadAction<MapTile[]>) => {
      state.map.push(action.payload);
    },
    storeDecreaseMapRow: (state, action: PayloadAction<number>) => {
      state.map.splice(state.map.length - action.payload, state.map.length);
    },
    storeIncreaseMapCol: (state, action: PayloadAction<MapTile[]>) => {
      state.map.forEach((row) => {
        row.push(...action.payload);
      });
    },
    storeDecreaseMapCol: (state, action: PayloadAction<number>) => {
      state.map.forEach((row) => {
        row.splice(row.length - action.payload, row.length);
      });
    },
  },
});

export const selectEditMap = (state: RootState) => state.editMap.map;

export const selectEditMapRow = (state: RootState) => state.editMap.row;

export const selectEditMapCol = (state: RootState) => state.editMap.col;

export const {
  storeSetWallInMap,
  storeSetFloorInMap,
  storeInitMap,
  storeSetCol,
  storeSetRow,
  storeIncreaseMapRow,
  storeDecreaseMapRow,
  storeIncreaseMapCol,
  storeDecreaseMapCol,
} = EditMapReducer.actions;

export default EditMapReducer.reducer;
