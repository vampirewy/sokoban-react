import playerImg from '@/assets/keeper.png';
import { useEditPlayer } from '@/composables/edit/editPlayer';
import { STEP_EDIT, usePosition } from '@/composables/game/usePosition';

export function EditPlayerView() {
  const { storePlayer, removePlayer } = useEditPlayer();
  const { position } = usePosition(storePlayer, STEP_EDIT);

  function handleDoubleClick() {
    removePlayer();
  }

  return (
    <div
      className="absolute"
      style={position}
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={playerImg}
        alt=""
      />
    </div>
  );
}
