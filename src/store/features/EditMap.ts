import { type RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][];

interface EditMapState {
  map: Map;
}

const initialState: EditMapState = {
  map: [],
};

const EditMapReducer = createSlice({
  name: "editMap",
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
  },
});

export const selectEditMap = (state: RootState): Map => state.editMap.map;

export const { storeSetWallInMap, storeSetFloorInMap, storeInitMap } = EditMapReducer.actions;

export default EditMapReducer.reducer;
