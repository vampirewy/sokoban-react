import playerImg from "@/assets/keeper.png";
import { useEditPlayer } from "@/composables/edit/editPlayer";
import { STEP_EDIT, usePosition } from "@/composables/game/usePosition";

export function EditPlayerView() {
  const { storePlayer } = useEditPlayer();

  const { position } = usePosition(storePlayer, STEP_EDIT);
  return (
    <div className="absolute" style={position}>
      <img src={playerImg} alt="" />
    </div>
  );
}
