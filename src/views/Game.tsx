import Map from "@/components/game/Map";
import Player from "@/components/game/Player";
import Cargo from "@/components/game/Cargo";
import Target from "@/components/game/Target";
import { useCargo } from "@/composables/game/useCargo";
import { useTarget } from "@/composables/game/useTarget";
import { useEffect } from "react";

export default function GameView() {
  const { storeCargos, addCargo, createCargo } = useCargo();
  const { storeTargets, addTarget, createTarget } = useTarget();

  useEffect(() => {
    addCargo(createCargo({ x: 3, y: 3 }));
    addCargo(createCargo({ x: 3, y: 4 }));
  }, []);

  useEffect(() => {
    addTarget(createTarget({ x: 2, y: 3 }));
    addTarget(createTarget({ x: 2, y: 4 }));
  }, []);

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
    </>
  );
}
