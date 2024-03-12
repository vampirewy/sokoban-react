import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { storeAddCargos, selectCargos, storeMoveCargo, storeCleanCargos, type Cargo } from "@/store/features/Cargos";
import { useMap } from "@/composables/game/useMap";
import { useTarget } from "./useTarget";
import { generateId } from "@/game/gameData";
import { type Position } from "./usePosition";

export function useCargo() {
  const { isWall, detectEdgeOfMap } = useMap();
  const { findTarget } = useTarget();

  const storeCargos = useAppSelector(selectCargos);
  const dispatch = useAppDispatch();

  function addCargo(cargo: Cargo) {
    dispatch(storeAddCargos(cargo));
  }

  function createCargo(position: Position): Cargo {
    return {
      x: position.x,
      y: position.y,
      id: generateId(),
      isTarget: false,
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

    if (detectEdgeOfMap(position)) return true;

    if (isWall(position)) return true;

    const cargo = findCargo(position);
    if (cargo) return true;

    const isTarget = detectionTarget(position);

    dispatch(storeMoveCargo({ cargo: c, dx, dy, isTarget }));
    return false;
  }

  function moveCargo(position: Position, dx: number, dy: number) {
    const cargo = findCargo(position);

    if (cargo) {
      const isMoveCargo = _move(cargo, dx, dy);
      return !!isMoveCargo;
    }

    return false;
  }

  function detectionTarget(position: Position) {
    return !!findTarget(position);
  }

  function cleanCargos() {
    dispatch(storeCleanCargos());
  }

  return {
    storeCargos,
    addCargo,
    createCargo,
    findCargo,
    moveCargo,
    detectionTarget,
    cleanCargos,
  };
}
