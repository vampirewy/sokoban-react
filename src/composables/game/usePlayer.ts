import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { moveDistance, resetPosition, selectPlayer } from "@/store/features/Player";
import { useCargo } from "@/composables/game/useCargo";
import {
  collisionLeftWallOrAtEdgeLeftMap,
  collisionDownWallOrAtEdgeDownMap,
  collisionTopWallOrAtEdgeTopMap,
  collisionRightWallOrAtEdgeRightMap,
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
  const { findCargo, moveCargoToLeft, moveCargoToRight, moveCargoToTop, moveCargoToDown } = useCargo();
  const player = useAppSelector(selectPlayer);

  const storeCollisionLeftWallOrAtEdgeLeftMap = useAppSelector(selectIsCollisionLeftWallOrAtEdgeLeftMap);
  const storeCollisionRightWallOrAtEdgeRightMap = useAppSelector(selectIsCollisionTheRightWallOrAtEdgeRightMap);
  const storeCollisionTopWallOrAtEdgeTopMap = useAppSelector(selectIsCollisionTheTopWallOrAtEdgeTopMap);
  const storeCollisionDownOrAtEdgeDownMap = useAppSelector(selectIsCollisionTheDownWallOrAtEdgeDownMap);

  const dispatch = useAppDispatch();

  function movePlayerToLeft() {
    if (storeCollisionLeftWallOrAtEdgeLeftMap) return;

    const cargo = findCargo({ x: player.x - 1, y: player.y });
    if (cargo) {
      moveCargoToLeft(cargo);
    }

    dispatch(moveDistance({ x: -1, y: 0 }));
  }

  function movePlayerToRight() {
    if (storeCollisionRightWallOrAtEdgeRightMap) return;
    /* 1. 移动的时候看看有没有箱子
       2. 如果有箱子，先移动箱子
       3. 再移动玩家 */

    const cargo = findCargo({ x: player.x + 1, y: player.y });
    if (cargo) {
      moveCargoToRight(cargo);
    }

    dispatch(moveDistance({ x: 1, y: 0 }));
  }

  function movePlayerToTop() {
    if (storeCollisionTopWallOrAtEdgeTopMap) return;

    const cargo = findCargo({ x: player.x, y: player.y - 1 });
    if (cargo) {
      moveCargoToTop(cargo);
    }

    dispatch(moveDistance({ x: 0, y: -1 }));
  }

  function movePlayerToDown() {
    if (storeCollisionDownOrAtEdgeDownMap) return;
    const cargo = findCargo({ x: player.x, y: player.y + 1 });
    if (cargo) {
      moveCargoToDown(cargo);
    }

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
      x: player.x - 1,
      y: player.y,
    };

    dispatch(collisionLeftWallOrAtEdgeLeftMap(position));
  }, [player.x, player.y, dispatch]);

  useEffect(() => {
    const position = {
      x: player.x + 1,
      y: player.y,
    };

    dispatch(collisionRightWallOrAtEdgeRightMap(position));
  }, [player.x, player.y, dispatch]);

  useEffect(() => {
    const position = {
      x: player.x,
      y: player.y - 1,
    };

    dispatch(collisionTopWallOrAtEdgeTopMap(position));
  }, [player.x, player.y, dispatch]);

  useEffect(() => {
    const position = {
      x: player.x,
      y: player.y + 1,
    };

    dispatch(collisionDownWallOrAtEdgeDownMap(position));
  }, [player.x, player.y, dispatch]);

  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToTop,
    movePlayerToDown,
    resetPlayerPosition,
  };
}
