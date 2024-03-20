import cargoImg from "@/assets/cargo.png";
import floorImg from "@/assets/floor.png";
import playerImg from "@/assets/keeper.png";
import targetImg from "@/assets/target.png";
import wallImg from "@/assets/wall.png";
import { StoreEditElement, selectCurrentEditElement, storeSetCurrentEditElement } from "@/store/features/EditElement";
import { useAppDispatch, useAppSelector } from "@/store/useHooks";
import { Position } from "../game/usePosition";
import { useEditCargo } from "./editCargo";
import { useEditMap } from "./editMap";
import { useEditPlayer } from "./editPlayer";
import { useEditTarget } from "./editTarget";

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
  const { addCargo, createCargo } = useEditCargo();
  const { addTarget, createTarget } = useEditTarget();

  const floorEditElement: EditElement = {
    name: "地板",
    img: floorImg,
    execute: (position) => updateFloorMap({ x: position.x, y: position.y }),
  };

  const wallEditElement: EditElement = {
    name: "墙",
    img: wallImg,
    execute: (position) => updateWallMap({ x: position.x, y: position.y }),
  };

  const playerEditElement: EditElement = {
    name: "玩家",
    img: playerImg,
    execute: (position) => updatePlayer(position),
  };

  const cargosEditElement: EditElement = {
    name: "箱子",
    img: cargoImg,
    execute: (position) => {
      addCargo(createCargo(position));
    },
  };

  const targetsEditElement: EditElement = {
    name: "放置点",
    img: targetImg,
    execute: (position) => {
      addTarget(createTarget(position));
    },
  };

  const editElement: Record<string, EditElement> = {
    地板: floorEditElement,
    墙: wallEditElement,
    玩家: playerEditElement,
    箱子: cargosEditElement,
    放置点: targetsEditElement,
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
    cargosEditElement,
    targetsEditElement,
    storeCurrentEditElement,
    setCurrentEditElement,
    getCurrentEditElement,
  };
}
