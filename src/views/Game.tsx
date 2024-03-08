import Map from "@/components/game/Map";
import Player from "@/components/game/Player";
import Cargo from "@/components/game/Cargo";
import { useCargo } from "@/composables/game/useCargo";
import { useEffect } from "react";

export default function GameView() {
  const { storeCargos, addCargo, createCargo } = useCargo();

  useEffect(() => {
    addCargo(createCargo({ x: 3, y: 3 }));
    addCargo(createCargo({ x: 3, y: 4 }));
  }, []);

  return (
    <>
      <Map></Map>

      {storeCargos.map((cargo) => (
        <Cargo key={cargo.id} cargo={cargo}></Cargo>
      ))}

      <Player></Player>
    </>
  );
}
