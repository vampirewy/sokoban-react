import { generateId } from "@/game/gameData";
import {
  EditTarget,
  selectTargets,
  storeAddTarget,
  storeCleanTargets,
  storeRemoveTarget,
} from "@/store/features/EditTarget";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { Position } from "../game/usePosition";

export function useEditTarget() {
  const storeTargets = useAppSelector(selectTargets);
  const dispatch = useAppDispatch();

  function addTarget(target: EditTarget) {
    dispatch(storeAddTarget(target));
  }

  function createTarget(position: Position): EditTarget {
    return {
      x: position.x,
      y: position.y,
      id: generateId(),
    };
  }

  function removeTarget(target: EditTarget) {
    dispatch(storeRemoveTarget(target.id));
  }

  function cleanTarget() {
    dispatch(storeCleanTargets());
  }

  return {
    addTarget,
    createTarget,
    removeTarget,
    cleanTarget,
    storeTargets,
  };
}
