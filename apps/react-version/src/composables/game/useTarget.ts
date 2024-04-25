import { generateId } from "@/game/gameData";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { selectTargets, storeAddTargets, storeCleanTargets, type Target } from "@/store/features/Target";
import { type Position } from "./usePosition";

export function useTarget() {
  const dispatch = useAppDispatch();
  const storeTargets = useAppSelector(selectTargets);

  function addTarget(target: Target) {
    dispatch(storeAddTargets(target));
  }

  function createTarget({ x, y }: Position): Target {
    return {
      x,
      y,
      id: generateId(),
    };
  }

  function findTarget(position: Position) {
    return storeTargets.find((target) => target.x === position.x && target.y === position.y);
  }

  function cleanTargets() {
    dispatch(storeCleanTargets());
  }

  return {
    storeTargets,
    addTarget,
    createTarget,
    findTarget,
    cleanTargets,
  };
}
