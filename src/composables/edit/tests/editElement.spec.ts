import { MapTile } from "@/store/features/EditMap";
import store from "@/store/store";
import { setupHooks } from "@/tests/helper";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useEditElement } from "../editElement";
import { useEditMap } from "../editMap";

function currentElement(name: string, img: string) {
  return {
    name,
    img,
  };
}

describe("use edit element", () => {
  beforeEach(() => {
    const { result: editMap } = setupHooks(() => useEditMap(), true);
    act(() => editMap.current.initEditMap());
  });

  it("should return floor when edit element is floor", () => {
    const { result: editElement } = setupHooks(() => useEditElement(), true);

    const floorEditElement = editElement.current.floorEditElement;

    act(() => editElement.current.setCurrentEditElement(currentElement(floorEditElement.name, floorEditElement.img)));
    act(() => editElement.current.getCurrentEditElement().execute({ x: 1, y: 1 }));

    expect(store.getState().editMap.map[1][1]).toEqual(MapTile.FLOOR);
  });

  it("should return wall when edit element is wall", () => {
    const { result: editElement } = setupHooks(() => useEditElement(), true);

    const wallEditElement = editElement.current.wallEditElement;

    act(() => editElement.current.setCurrentEditElement(currentElement(wallEditElement.name, wallEditElement.img)));
    act(() => editElement.current.getCurrentEditElement().execute({ x: 1, y: 1 }));

    expect(store.getState().editMap.map[1][1]).toEqual(MapTile.WALL);
  });

  it("should return player when edit element is player", () => {
    const { result: editElement } = setupHooks(() => useEditElement(), true);

    const playerEditElement = editElement.current.playerEditElement;

    act(() => editElement.current.setCurrentEditElement(currentElement(playerEditElement.name, playerEditElement.img)));
    act(() => editElement.current.getCurrentEditElement().execute({ x: 2, y: 2 }));

    expect(store.getState().editPlayer.player).toEqual({ x: 2, y: 2 });
  });
});
