import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { storeAddCargos, selectCargos, storeMoveCargo, storeCleanCargos } from "@/store/features/Cargos";

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

  function _move(c: Cargo, dx: number, dy: number) {
    const position = {
      x: c.x + dx,
      y: c.y + dy,
    };

    const cargo = findCargo(position);
    if (cargo) return true;

    dispatch(storeMoveCargo({ cargo: c, dx, dy }));
    return false;
  }

  function moveCargoToRight(c: Cargo) {
    const isMoveCargo = _move(c, 1, 0);

    if (isMoveCargo) return true;

    return false;
  }

  function moveCargoToLeft(c: Cargo) {
    const isMoveCargo = _move(c, -1, 0);

    if (isMoveCargo) return true;

    return false;
  }

  function moveCargoToTop(c: Cargo) {
    const isMoveCargo = _move(c, 0, -1);

    if (isMoveCargo) return true;

    return false;
  }

  function moveCargoToDown(c: Cargo) {
    const isMoveCargo = _move(c, 0, 1);

    if (isMoveCargo) return true;

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
