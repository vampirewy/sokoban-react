import {
  MapTile,
  selectEditMap,
  selectEditMapCol,
  selectEditMapRow,
  storeDecreaseMapRow,
  storeIncreaseMapRow,
  storeInitMap,
  storeSetCol,
  storeSetFloorInMap,
  storeSetRow,
  storeSetWallInMap,
} from "@/store/features/EditMap";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";

export function useEditMap() {
  const storeMap = useAppSelector(selectEditMap);
  const storeRow = useAppSelector(selectEditMapRow);
  const storeCol = useAppSelector(selectEditMapCol);

  const dispatch = useAppDispatch();

  function initEditMap() {
    const map = [];
    for (let i = 0; i < Number(storeRow); i++) {
      const cells = [];
      for (let j = 0; j < Number(storeCol); j++) {
        cells.push(MapTile.FLOOR);
      }
      map.push(cells);
    }
    dispatch(storeInitMap(map));
  }

  function setRow(row: string) {
    dispatch(storeSetRow(row));
  }

  function setCol(col: string) {
    dispatch(storeSetCol(col));
  }

  function updateFloorMap({ x, y }: { x: number; y: number }) {
    dispatch(storeSetFloorInMap({ x, y }));
  }

  function updateWallMap({ x, y }: { x: number; y: number }) {
    dispatch(storeSetWallInMap({ x, y }));
  }

  function updateMapRow() {
    const oldRow = storeMap.length;
    const col = storeMap[0].length;

    if (Number(storeRow) > oldRow) {
      const diff = Number(storeRow) - oldRow;

      for (let i = 0; i < diff; i++) {
        dispatch(storeIncreaseMapRow(Array(col).fill(MapTile.FLOOR)));
      }
    } else if (Number(storeRow) < oldRow) {
      const diff = oldRow - Number(storeRow);

      dispatch(storeDecreaseMapRow(diff));
    }
  }

  function updateMapCol() {
    // TODO: 更新列
  }

  return {
    storeMap,
    storeCol,
    storeRow,
    initEditMap,
    setCol,
    setRow,
    updateFloorMap,
    updateWallMap,
    updateMapCol,
    updateMapRow,
  };
}
