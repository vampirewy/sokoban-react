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

  function moveCargoToRight(c: Cargo) {
    const position = {
      x: c.x + 1,
      y: c.y,
    };

    const cargo = findCargo(position);

    if (cargo) return true;

    dispatch(storeMoveCargoToRight(c));
    return false;
  }

  function moveCargoToLeft(c: Cargo) {
    const position = {
      x: c.x - 1,
      y: c.y,
    };

    const cargo = findCargo(position);

    if (cargo) return true;

    dispatch(storeMoveCargoToLeft(c));
    return false;
  }

  function moveCargoToTop(c: Cargo) {
    const position = {
      x: c.x,
      y: c.y - 1,
    };

    const cargo = findCargo(position);
    if (cargo) return true;

    dispatch(storeMoveCargoToTop(c));
    return false;
  }

  function moveCargoToDown(c: Cargo) {
    const position = {
      x: c.x,
      y: c.y + 1,
    };
    const cargo = findCargo(position);
    if (cargo) return true;

    dispatch(storeMoveCargoToDown(c));
    return false;
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
