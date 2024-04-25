import { useCargo } from "@/composables/game/useCargo";
import { useMap } from "@/composables/game/useMap";
import { moveDistance, resetPosition, selectPlayer } from "@/store/features/Player";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";

interface Position {
  x: number;
  y: number;
}

export function usePlayer() {
  const { moveCargo } = useCargo();
  const { isWall, detectEdgeOfMap } = useMap();
  const storePlayer = useAppSelector(selectPlayer);

  const dispatch = useAppDispatch();

  function movePlayerToLeft() {
    const position = {
      x: storePlayer.x - 1,
      y: storePlayer.y,
    };

    if (detectEdgeOfMap(position)) return;

    if (isWall(position)) return;

    if (moveCargo(position, -1, 0)) return;

    dispatch(moveDistance({ x: -1, y: 0 }));
  }

  function movePlayerToRight() {
    const position = {
      x: storePlayer.x + 1,
      y: storePlayer.y,
    };

    if (detectEdgeOfMap(position)) return;

    if (isWall(position)) return;
    /* 1. 移动的时候看看有没有箱子
       2. 如果有箱子，先移动箱子
       3. 再移动玩家 */

    if (moveCargo(position, 1, 0)) return;

    dispatch(moveDistance({ x: 1, y: 0 }));
  }

  function movePlayerToTop() {
    const position = {
      x: storePlayer.x,
      y: storePlayer.y - 1,
    };

    if (detectEdgeOfMap(position)) return;

    if (isWall(position)) return;

    if (moveCargo(position, 0, -1)) return;

    dispatch(moveDistance({ x: 0, y: -1 }));
  }

  function movePlayerToDown() {
    const position = {
      x: storePlayer.x,
      y: storePlayer.y + 1,
    };

    if (detectEdgeOfMap(position)) return;
    if (isWall(position)) return;

    if (moveCargo(position, 0, 1)) return;

    dispatch(moveDistance({ x: 0, y: 1 }));
  }

  function resetPlayerPosition(position: Position) {
    dispatch(resetPosition(position));
  }

  // useEffect(() => {
  //   /**
  //    当第一次移动的时候，
  //    更新了 isCollisionWall 的值，
  //    因为 React 的特性，要再调用一次 movePlayerToLeft，
  //    才能拿到最新的 isCollisionWall 的值，
  //    玩家才不会移动到墙里面
  //    */
  //   const position = {
  //     x: storePlayer.x - 1,
  //     y: storePlayer.y,
  //   };

  //   dispatch(storeCollisionLeftWallOrAtEdgeLeftMap(position));
  // }, [storePlayer.x, storePlayer.y, dispatch]);

  return {
    storePlayer,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToTop,
    movePlayerToDown,
    resetPlayerPosition,
  };
}
