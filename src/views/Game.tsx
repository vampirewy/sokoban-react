import { useEffect } from "react";

import Map from "@/components/game/Map";
import Player from "@/components/game/Player";
import Cargo from "@/components/game/Cargo";
import Target from "@/components/game/Target";
import { useCargo } from "@/composables/game/useCargo";
import { useTarget } from "@/composables/game/useTarget";
import { useGame } from "@/composables/game/useGame";
import { gameData } from "@/game/gameData";

export default function GameView() {
  const { setupGame } = useGame();
  const { storeCargos } = useCargo();
  const { storeTargets } = useTarget();

  useEffect(() => {
    setupGame(gameData);
  }, []);

  function handleClick() {}

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
        <div className=" bg-red-500" onClick={handleClick}>
          下一关
        </div>
      </div>
    </>
  );
}
