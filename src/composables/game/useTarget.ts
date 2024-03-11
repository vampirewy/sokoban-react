import { generateId } from "@/game/gameData";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { selectTargets, storeAddTargets, storeCleanTargets, type Target } from "@/store/features/Target";

export function useTarget() {
  const dispatch = useAppDispatch();
  const storeTargets = useAppSelector(selectTargets);

  function addTarget(target: Target) {
    dispatch(storeAddTargets(target));
  }

  function createTarget({ x, y }: { x: number; y: number }): Target {
    return {
      x,
      y,
      id: generateId(),
    };
  }

  function cleanTargets() {
    dispatch(storeCleanTargets());
  }
  return {
    storeTargets,
    addTarget,
    createTarget,
    cleanTargets,
  };
}
