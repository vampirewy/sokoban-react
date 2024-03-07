import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { resetPosition, moveToDown, moveToLeft, moveToRight, moveToTop, selectPlayer } from "@/store/features/Player";
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
  const { findCargo } = useCargo();
  const player = useAppSelector(selectPlayer);

  const storeCollisionLeftWallOrAtEdgeLeftMap = useAppSelector(selectIsCollisionLeftWallOrAtEdgeLeftMap);
  const storeCollisionRightWallOrAtEdgeRightMap = useAppSelector(selectIsCollisionTheRightWallOrAtEdgeRightMap);
  const storeCollisionTopWallOrAtEdgeTopMap = useAppSelector(selectIsCollisionTheTopWallOrAtEdgeTopMap);
  const storeCollisionDownOrAtEdgeDownMap = useAppSelector(selectIsCollisionTheDownWallOrAtEdgeDownMap);

  const dispatch = useAppDispatch();

  function movePlayerToLeft() {
    if (storeCollisionLeftWallOrAtEdgeLeftMap) return;

    dispatch(moveToLeft());
  }

  function movePlayerToRight() {
    if (storeCollisionRightWallOrAtEdgeRightMap) return;

    dispatch(moveToRight());
  }

  function movePlayerToTop() {
    if (storeCollisionTopWallOrAtEdgeTopMap) return;

    dispatch(moveToTop());
  }

  function movePlayerToDown() {
    if (storeCollisionDownOrAtEdgeDownMap) return;

    dispatch(moveToDown());
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

    /* 移动的时候看看有没有箱子 */

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
