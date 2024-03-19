import floorImg from "@/assets/floor.png";
import playerImg from "@/assets/keeper.png";
import wallImg from "@/assets/wall.png";
import { StoreEditElement, selectCurrentEditElement, storeSetCurrentEditElement } from "@/store/features/EditElement";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { Position } from "../game/usePosition";
import { useEditMap } from "./editMap";
import { useEditPlayer } from "./editPlayer";

export interface EditElement {
  name: string;
  img: string;
  execute: (position: Position) => void;
}

export function useEditElement() {
  const storeCurrentEditElement = useAppSelector(selectCurrentEditElement);
  const dispatch = useAppDispatch();

  const { updateFloorMap, updateWallMap } = useEditMap();
  const { updatePlayer } = useEditPlayer();

  const floorEditElement: EditElement = {
    name: "地板",
    img: floorImg,
    execute: (position) => {
      updateFloorMap({ x: position.x, y: position.y });
    },
  };

  const wallEditElement: EditElement = {
    name: "墙",
    img: wallImg,
    execute: (position) => {
      updateWallMap({ x: position.x, y: position.y });
    },
  };

  const playerEditElement: EditElement = {
    name: "玩家",
    img: playerImg,
    execute: (position) => {
      updatePlayer(position);
    },
  };

  const editElement: Record<string, EditElement> = {
    地板: floorEditElement,
    墙: wallEditElement,
    玩家: playerEditElement,
  };

  function setCurrentEditElement(editElement: StoreEditElement) {
    dispatch(storeSetCurrentEditElement(editElement));
  }

  function getCurrentEditElement() {
    return editElement[storeCurrentEditElement.name];
  }

  return {
    floorEditElement,
    playerEditElement,
    wallEditElement,
    storeCurrentEditElement,
    setCurrentEditElement,
    getCurrentEditElement,
  };
}
