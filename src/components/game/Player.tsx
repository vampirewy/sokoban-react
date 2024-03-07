import playerImg from "@/assets/keeper.png";

import { useEffect } from "react";
import { usePosition } from "@/composables/game/usePosition";
import { usePlayer } from "@/composables/game/usePlayer";

export default function Player() {
  const { player, movePlayerToDown, movePlayerToLeft, movePlayerToRight, movePlayerToTop } = usePlayer();

  const { position } = usePosition(player);

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
