import playerImg from "@/assets/keeper.png";

import { usePlayer } from "@/composables/game/usePlayer";
import { usePosition } from "@/composables/game/usePosition";
import { useEffect } from "react";

export default function Player() {
  const { storePlayer, movePlayerToDown, movePlayerToLeft, movePlayerToRight, movePlayerToTop } = usePlayer();

  const { position } = usePosition(storePlayer);

  useMove();

  function useMove() {
    function handleKeyup(e: KeyboardEvent) {
      switch (e.code) {
        case "ArrowRight":
          movePlayerToRight();
          break;

        case "ArrowLeft": {
          movePlayerToLeft();
          break;
        }

        case "ArrowUp":
          movePlayerToTop();
          break;

        case "ArrowDown":
          movePlayerToDown();
          break;
      }
    }
    useEffect(() => {
      window.addEventListener("keyup", handleKeyup);
      return () => {
        window.removeEventListener("keyup", handleKeyup);
      };
    });
  }

  return (
    <div className="absolute" style={position}>
      <img src={playerImg} alt="" />
    </div>
  );
}
