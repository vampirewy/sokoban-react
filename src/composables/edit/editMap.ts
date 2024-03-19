import { MapTile, selectEditMap, storeInitMap, storeSetFloorInMap, storeSetWallInMap } from "@/store/features/EditMap";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";

export function useEditMap() {
  const storeMap = useAppSelector(selectEditMap);
  const dispatch = useAppDispatch();

  function initEditMap() {
    const row = 8;
    const col = 8;
    const map = [];
    for (let i = 0; i < row; i++) {
      const cells = [];
      for (let j = 0; j < col; j++) {
        cells.push(MapTile.FLOOR);
      }
      map.push(cells);
    }
    dispatch(storeInitMap(map));
  }

  function updateFloorMap({ x, y }: { x: number; y: number }) {
    dispatch(storeSetFloorInMap({ x, y }));
  }

  function updateWallMap({ x, y }: { x: number; y: number }) {
    dispatch(storeSetWallInMap({ x, y }));
  }

  return {
    storeMap,
    initEditMap,
    updateFloorMap,
    updateWallMap,
  };
}
