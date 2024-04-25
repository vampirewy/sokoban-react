import { generateId } from "@/game/gameData";
import {
  selectCargos,
  storeAddCargo,
  storeCleanCargos,
  storeRemoveCargo,
  type EditCargo,
} from "@/store/features/EditCargo";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { Position } from "../game/usePosition";

export function useEditCargo() {
  const dispatch = useAppDispatch();

  const storeCargos = useAppSelector(selectCargos);

  function addCargo(cargo: EditCargo) {
    dispatch(storeAddCargo(cargo));
  }

  function createCargo(position: Position): EditCargo {
    return {
      x: position.x,
      y: position.y,
      id: generateId(),
    };
  }

  function removeCargo(cargo: EditCargo) {
    dispatch(storeRemoveCargo(cargo));
  }

  function cleanCargo() {
    dispatch(storeCleanCargos());
  }

  return { storeCargos, createCargo, addCargo, removeCargo, cleanCargo };
}
