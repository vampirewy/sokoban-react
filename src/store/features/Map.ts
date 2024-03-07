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
    setupMap: (state, action: PayloadAction<Map>) => {
      state.map = action.payload;
    },
    collisionLeftWallOrAtEdgeLeftMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (action.payload.x < 0) state.isCollisionTheLeftWallOrAtEdgeMap = true;
      else state.isCollisionTheLeftWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    collisionRightWallOrAtEdgeRightMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (action.payload.x > state.map[0].length - 1) state.isCollisionTheRightWallOrAtEdgeMap = true;
      else state.isCollisionTheRightWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    collisionTopWallOrAtEdgeTopMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (action.payload.y < 0) state.isCollisionTheTopWallOrAtEdgeMap = true;
      else state.isCollisionTheTopWallOrAtEdgeMap = isWall(state.map, action.payload);
    },
    collisionDownWallOrAtEdgeDownMap: (state, action: PayloadAction<{ x: number; y: number }>) => {
      if (action.payload.y > state.map.length - 1) state.isCollisionTheDownWallOrAtEdgeMap = true;
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
  setupMap,
  collisionLeftWallOrAtEdgeLeftMap,
  collisionRightWallOrAtEdgeRightMap,
  collisionTopWallOrAtEdgeTopMap,
  collisionDownWallOrAtEdgeDownMap,
} = MapReducer.actions;

export default MapReducer.reducer;
