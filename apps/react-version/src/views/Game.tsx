import { useEffect } from "react";

import Cargo from "@/components/game/Cargo";
import Map from "@/components/game/Map";
import Player from "@/components/game/Player";
import Target from "@/components/game/Target";
import { useCargo } from "@/composables/game/useCargo";
import { useGame } from "@/composables/game/useGame";
import { useTarget } from "@/composables/game/useTarget";
import { gameData } from "@/game/gameData";

export default function GameView() {
  const { setupGame, gameStatus, updateGameLevel, toNextLevel, detectGameCompleted } = useGame();
  const { storeCargos } = useCargo();
  const { storeTargets } = useTarget();

  function handleClick() {
    toNextLevel();
  }

  useEffect(() => {
    setupGame(gameData);
  }, []);

  useEffect(() => {
    detectGameCompleted();
  }, [storeCargos]);

  useEffect(() => {
    if (gameStatus.isGameCompleted) {
      updateGameLevel();
    }
  }, [gameStatus.isGameCompleted]);

  return (
    <>
      <Map></Map>

      {storeTargets.map((target) => (
        <Target key={target.id} target={target}></Target>
      ))}

      {storeCargos.map((cargo) => (
        <Cargo key={cargo.id} cargo={cargo}></Cargo>
      ))}

      <Player></Player>

      <div>
        {gameStatus.isGameCompleted && (
          <div className=" bg-red-500" onClick={handleClick}>
            下一关
          </div>
        )}
      </div>
    </>
  );
}
