import { selectEditPlayer, storeUpdatePlayer } from "@/store/features/EditPlayer";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";

import { Position } from "../game/usePosition";

export function useEditPlayer() {
  const dispatch = useAppDispatch();
  const storePlayer = useAppSelector(selectEditPlayer);

  function updatePlayer(position: Position) {
    dispatch(storeUpdatePlayer(position));
  }

  return {
    storePlayer,
    updatePlayer,
  };
}
