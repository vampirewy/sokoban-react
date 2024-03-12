import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { MapTile, type Map, selectMap, storeSetupMap } from "@/store/features/Map";

interface Position {
  x: number;
  y: number;
}

export function useMap() {
  const storeMap = useAppSelector(selectMap);
  const dispatch = useAppDispatch();

  function setupMap(map: Map) {
    dispatch(storeSetupMap(map));
  }

  function isWall(position: Position) {
    return storeMap[position.y][position.x] === MapTile.WALL;
  }

  function detectEdgeOfMap(position: Position) {
    if (_isAtLeftEdgeOfMap(position)) return true;
    if (_isAtRightEdgeOfMap(position)) return true;
    if (_isAtTopEdgeOfMap(position)) return true;
    if (_isAtDownEdgeOfMap(position)) return true;
    return false;
  }

  function _isAtLeftEdgeOfMap(position: Position) {
    const MAP_MINI_LENGTH = 0;
    return !!(position.x < MAP_MINI_LENGTH);
  }

  function _isAtRightEdgeOfMap(position: Position) {
    const MAP_ROW_LENGTH = storeMap[0].length - 1;
    return !!(position.x > MAP_ROW_LENGTH);
  }

  function _isAtTopEdgeOfMap(position: Position) {
    const MAP_MINI_LENGTH = 0;
    return !!(position.y < MAP_MINI_LENGTH);
  }

  function _isAtDownEdgeOfMap(position: Position) {
    const MAP_COL_LENGTH = storeMap.length - 1;
    return !!(position.y > MAP_COL_LENGTH);
  }

  return {
    storeMap,
    setupMap,
    isWall,
    detectEdgeOfMap,
  };
}
