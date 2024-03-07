import { useAppSelector } from "@/store/useHooks";
import { selectCargos } from "@/store/features/Cargos";

export interface Position {
  x: number;
  y: number;
}

export function useCargo() {
  const storeCargos = useAppSelector(selectCargos);

  function findCargo(position: Position) {
    return storeCargos.find((cargo) => cargo.x === position.x && cargo.y === position.y);
  }

  return {
    findCargo,
  };
}
