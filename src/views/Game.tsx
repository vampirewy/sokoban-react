import Map from "@/components/game/Map";
import Player from "@/components/game/Player";
import Cargo from "@/components/game/Cargo";
import { useAppSelector } from "@/store/useHooks";
import { selectCargos } from "@/store/features/Cargos";

export default function GameView() {
  const storeCargos = useAppSelector(selectCargos);

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
