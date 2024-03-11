import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { moveDistance, resetPosition, selectPlayer } from "@/store/features/Player";
import { useCargo } from "@/composables/game/useCargo";
import {
  storeCollisionDownWallOrAtEdgeDownMap,
  storeCollisionLeftWallOrAtEdgeLeftMap,
  storeCollisionRightWallOrAtEdgeRightMap,
  storeCollisionTopWallOrAtEdgeTopMap,
  selectIsCollisionLeftWallOrAtEdgeLeftMap,
  selectIsCollisionTheRightWallOrAtEdgeRightMap,
  selectIsCollisionTheDownWallOrAtEdgeDownMap,
  selectIsCollisionTheTopWallOrAtEdgeTopMap,
} from "@/store/features/Map";
import { useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export function usePlayer() {
  const { moveCargo } = useCargo();
  const storePlayer = useAppSelector(selectPlayer);

  const storeCollisionWallOrEdgeMapLeft = useAppSelector(selectIsCollisionLeftWallOrAtEdgeLeftMap);
  const storeCollisionWallOrEdgeMapRight = useAppSelector(selectIsCollisionTheRightWallOrAtEdgeRightMap);
  const storeCollisionWallOrEdgeMapTop = useAppSelector(selectIsCollisionTheTopWallOrAtEdgeTopMap);
  const storeCollisionWallOrEdgeMapDown = useAppSelector(selectIsCollisionTheDownWallOrAtEdgeDownMap);

  const dispatch = useAppDispatch();

  function movePlayerToLeft() {
    if (storeCollisionWallOrEdgeMapLeft) return;

    if (moveCargo({ x: storePlayer.x - 1, y: storePlayer.y }, -1, 0)) return;

    dispatch(moveDistance({ x: -1, y: 0 }));
  }

  function movePlayerToRight() {
    if (storeCollisionWallOrEdgeMapRight) return;
    /* 1. 移动的时候看看有没有箱子
       2. 如果有箱子，先移动箱子
       3. 再移动玩家 */

    if (moveCargo({ x: storePlayer.x + 1, y: storePlayer.y }, 1, 0)) return;

    dispatch(moveDistance({ x: 1, y: 0 }));
  }

  function movePlayerToTop() {
    if (storeCollisionWallOrEdgeMapTop) return;

    if (moveCargo({ x: storePlayer.x, y: storePlayer.y - 1 }, 0, -1)) return;

    dispatch(moveDistance({ x: 0, y: -1 }));
  }

  function movePlayerToDown() {
    if (storeCollisionWallOrEdgeMapDown) return;

    if (moveCargo({ x: storePlayer.x, y: storePlayer.y + 1 }, 0, 1)) return;

    dispatch(moveDistance({ x: 0, y: 1 }));
  }

  function resetPlayerPosition(position: Position) {
    dispatch(resetPosition(position));
  }

  useEffect(() => {
    /** 
     当第一次移动的时候，
     更新了 isCollisionWall 的值，
     因为 React 的特性，要再调用一次 movePlayerToLeft，
     才能拿到最新的 isCollisionWall 的值，
     玩家才不会移动到墙里面
     */
    const position = {
      x: storePlayer.x - 1,
      y: storePlayer.y,
    };

    dispatch(storeCollisionLeftWallOrAtEdgeLeftMap(position));
  }, [storePlayer.x, storePlayer.y, dispatch]);

  useEffect(() => {
    const position = {
      x: storePlayer.x + 1,
      y: storePlayer.y,
    };

    dispatch(storeCollisionRightWallOrAtEdgeRightMap(position));
  }, [storePlayer.x, storePlayer.y, dispatch]);

  useEffect(() => {
    const position = {
      x: storePlayer.x,
      y: storePlayer.y - 1,
    };

    dispatch(storeCollisionTopWallOrAtEdgeTopMap(position));
  }, [storePlayer.x, storePlayer.y, dispatch]);

  useEffect(() => {
    const position = {
      x: storePlayer.x,
      y: storePlayer.y + 1,
    };

    dispatch(storeCollisionDownWallOrAtEdgeDownMap(position));
  }, [storePlayer.x, storePlayer.y, dispatch]);

  return {
    player: storePlayer,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToTop,
    movePlayerToDown,
    resetPlayerPosition,
  };
}
