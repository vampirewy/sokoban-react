import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export type Map = MapTile[][];

interface Position {
  x: number;
  y: number;
}

interface MapState {
  map: Map;
  isCollisionTheLeftWallOrAtEdgeMap: boolean;
  isCollisionTheRightWallOrAtEdgeMap: boolean;
  isCollisionTheTopWallOrAtEdgeMap: boolean;
  isCollisionTheDownWallOrAtEdgeMap: boolean;
}

const initialState: MapState = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  isCollisionTheLeftWallOrAtEdgeMap: false,
  isCollisionTheRightWallOrAtEdgeMap: false,
  isCollisionTheTopWallOrAtEdgeMap: false,
  isCollisionTheDownWallOrAtEdgeMap: false,
};

const MapReducer = createSlice({
  name: "map",
  initialState,
  reducers: {
    storeSetupMap: (state, action: PayloadAction<Map>) => {
      state.map = action.payload;
    },
    storeCollisionLeftWallOrAtEdgeLeftMap: (state, action: PayloadAction<Position>) => {
      const MAP_MINI_LENGTH = 0;

      if (action.payload.x < MAP_MINI_LENGTH) state.isCollisionTheLeftWallOrAtEdgeMap = true;
      else state.isCollisionTheLeftWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    storeCollisionRightWallOrAtEdgeRightMap: (state, action: PayloadAction<Position>) => {
      const MAP_ROW_LENGTH = state.map[0].length - 1;

      if (action.payload.x > MAP_ROW_LENGTH) state.isCollisionTheRightWallOrAtEdgeMap = true;
      else state.isCollisionTheRightWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    storeCollisionTopWallOrAtEdgeTopMap: (state, action: PayloadAction<Position>) => {
      const MAP_MINI_LENGTH = 0;

      if (action.payload.y < MAP_MINI_LENGTH) state.isCollisionTheTopWallOrAtEdgeMap = true;
      else state.isCollisionTheTopWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    storeCollisionDownWallOrAtEdgeDownMap: (state, action: PayloadAction<Position>) => {
      const MAP_COL_LENGTH = state.map.length - 1;

      if (action.payload.y > MAP_COL_LENGTH) state.isCollisionTheDownWallOrAtEdgeMap = true;
      else state.isCollisionTheDownWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
  },
});

export function isWall(map: Map, position: Position) {
  return map[position.y][position.x] === MapTile.WALL;
}

export const selectMap = (state: RootState): Map => state.map.map;

export const selectIsCollisionLeftWallOrAtEdgeLeftMap = (state: RootState) =>
  state.map.isCollisionTheLeftWallOrAtEdgeMap;

export const selectIsCollisionTheRightWallOrAtEdgeRightMap = (state: RootState) =>
  state.map.isCollisionTheRightWallOrAtEdgeMap;

export const selectIsCollisionTheTopWallOrAtEdgeTopMap = (state: RootState) =>
  state.map.isCollisionTheTopWallOrAtEdgeMap;

export const selectIsCollisionTheDownWallOrAtEdgeDownMap = (state: RootState) =>
  state.map.isCollisionTheDownWallOrAtEdgeMap;

export const {
  storeSetupMap,
  storeCollisionLeftWallOrAtEdgeLeftMap,
  storeCollisionRightWallOrAtEdgeRightMap,
  storeCollisionTopWallOrAtEdgeTopMap,
  storeCollisionDownWallOrAtEdgeDownMap,
} = MapReducer.actions;

export default MapReducer.reducer;
