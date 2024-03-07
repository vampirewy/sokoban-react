import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import {
  storeAddCargos,
  selectCargos,
  storeCleanCargos,
  storeMoveCargoToRight,
  storeMoveCargoToLeft,
  storeMoveCargoToTop,
  storeMoveCargoToDown,
} from "@/store/features/Cargos";

export interface Cargo {
  x: number;
  y: number;
  id: number;
}
export interface Position {
  x: number;
  y: number;
}

let id = 0;

export function useCargo() {
  const storeCargos = useAppSelector(selectCargos);
  const dispatch = useAppDispatch();

  function addCargo(cargo: Cargo) {
    dispatch(storeAddCargos(cargo));
  }

  function createCargo(position: Position): Cargo {
    return {
      x: position.x,
      y: position.y,
      id: id++,
    };
  }

  function findCargo(position: Position) {
    return storeCargos.find((cargo) => cargo.x === position.x && cargo.y === position.y);
  }

  function moveCargoToRight(cargo: Cargo) {
    dispatch(storeMoveCargoToRight(cargo));
  }

  function moveCargoToLeft(cargo: Cargo) {
    dispatch(storeMoveCargoToLeft(cargo));
  }

  function moveCargoToTop(cargo: Cargo) {
    dispatch(storeMoveCargoToTop(cargo));
  }

  function moveCargoToDown(cargo: Cargo) {
    dispatch(storeMoveCargoToDown(cargo));
  }

  function cleanCargos() {
    dispatch(storeCleanCargos());
  }

  return {
    storeCargos,
    addCargo,
    createCargo,
    findCargo,
    moveCargoToRight,
    moveCargoToLeft,
    moveCargoToTop,
    moveCargoToDown,
    cleanCargos,
  };
}
