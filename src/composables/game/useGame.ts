import { useCargo } from "./useCargo";
import { useTarget } from "./useTarget";
import { useMap } from "./useMap";
import { type GameData } from "@/game/gameData";

export function useGame() {
  const { setupMap } = useMap();
  const { addCargo, createCargo } = useCargo();
  const { addTarget, createTarget } = useTarget();

  function setupGame(gameData: GameData) {
    setupMap(gameData[0].map);

    gameData[0].cargos.forEach((c) => {
      addCargo(createCargo({ x: c.x, y: c.y }));
    });

    gameData[0].targets.forEach((t) => {
      addTarget(createTarget({ x: t.x, y: t.y }));
    });
  }

  return {
    setupGame,
  };
}
