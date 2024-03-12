import { useState } from "react";
import { useCargo } from "./useCargo";
import { useTarget } from "./useTarget";
import { useMap } from "./useMap";
import { usePlayer } from "./usePlayer";
import { type GameData } from "@/game/gameData";

interface Game {
  isGameCompleted: boolean;
  level: number;
}

let _gameData: GameData;

export function useGame() {
  const { setupMap } = useMap();
  const { resetPlayerPosition } = usePlayer();
  const { storeCargos, addCargo, createCargo, cleanCargos } = useCargo();
  const { addTarget, createTarget, cleanTargets } = useTarget();

  const [gameStatus, setGameStatus] = useState<Game>({
    isGameCompleted: false,
    level: 1,
  });

  function setupLevel() {
    cleanCargos();
    cleanTargets();

    setupMap(_gameData[gameStatus.level - 1].map);

    _gameData[gameStatus.level - 1].cargos.forEach((c) => {
      addCargo(createCargo({ x: c.x, y: c.y }));
    });

    _gameData[gameStatus.level - 1].targets.forEach((t) => {
      addTarget(createTarget({ x: t.x, y: t.y }));
    });

    resetPlayerPosition(_gameData[0].player);
  }

  function setupGame(gameData: GameData) {
    _gameData = gameData;

    setupLevel();

    setGameStatus((prev) => {
      return {
        ...prev,
        level: prev.level + 1,
      };
    });
  }

  function toNextLevel() {
    setGameStatus((prev) => {
      return {
        ...prev,
        isGameCompleted: false,
      };
    });
    setupLevel();
  }

  function detectGameCompleted() {
    setGameStatus((prev) => {
      return {
        ...prev,
        isGameCompleted: storeCargos.every((cargo) => cargo.isTarget),
      };
    });
  }

  return {
    gameStatus,
    setupGame,
    toNextLevel,
    detectGameCompleted,
  };
}
