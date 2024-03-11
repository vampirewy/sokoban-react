import { useAppSelector } from "@/store/useHooks";
import { MapTile, selectMap } from "@/store/features/Map";

interface Position {
  x: number;
  y: number;
}

export function useMap() {
  const storeMap = useAppSelector(selectMap);

  function isWall(position: Position) {
    return storeMap[position.y][position.x] === MapTile.WALL;
  }

  return {
    isWall,
  };
}
