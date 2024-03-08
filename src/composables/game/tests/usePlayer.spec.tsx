import { beforeEach, describe, it, expect, afterEach } from "vitest";
import { act } from "@testing-library/react";
import store from "@/store/store";
import { setupHooks, setupStore } from "@/tests/helper";
import { storeSetupMap } from "@/store/features/Map";
import { usePlayer } from "../usePlayer";
import { useCargo } from "../useCargo";

describe("usePlayer", () => {
  describe("normal move", () => {
    beforeEach(() => {
      const map = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ];
      const { dispatch } = setupStore();
      dispatch(storeSetupMap(map));
    });

    it("should move to left", () => {
      const { result: player } = setupHooks(usePlayer, true);

      const position = { x: 1, y: 1 };

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player.x).toBe(position.x - 1);
      expect(player.current.player.y).toBe(1);
    });

    it("should move to right", () => {
      const position = { x: 1, y: 1 };

      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player.x).toBe(position.x + 1);
      expect(player.current.player.y).toBe(position.y);
    });

    it("should move to up", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player.x).toBe(position.x);
      expect(player.current.player.y).toBe(position.y - 1);
    });

    it("should move to down", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player.x).toBe(position.x);
      expect(player.current.player.y).toBe(position.y + 1);
    });
  });

  describe("at the edge of map", () => {
    beforeEach(() => {
      const map = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ];
      const { dispatch } = setupStore();
      dispatch(storeSetupMap(map));
    });

    it("should not move to left when the player is already at the left edge of the map", () => {
      const position = { x: 0, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to right when the player is already at the right edge of the map", () => {
      const position = { x: 2, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to top when the player is already at the top edge of the map", () => {
      const position = { x: 0, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to down when the player is already at the down edge of the map", () => {
      const position = { x: 0, y: 2 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player).toEqual(position);
    });
  });

  describe("wall collision", () => {
    beforeEach(() => {
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      const { dispatch } = setupStore();

      dispatch(storeSetupMap(map));
    });

    it("should not move to left when collision is wall", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to right when collision is wall", () => {
      const position = { x: 3, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to top when collision is wall", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player).toEqual(position);
    });

    it("should not move to down when collision is wall", () => {
      const position = { x: 1, y: 3 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player).toEqual(position);
    });
  });

  describe("push cargo", () => {
    beforeEach(() => {
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      const { dispatch } = setupStore();
      dispatch(storeSetupMap(map));
    });

    afterEach(() => {
      const { result: cargo } = setupHooks(useCargo, true);
      act(() => cargo.current.cleanCargos());
    });

    it("should move the cargo to left", () => {
      const cargoPosition = { x: 2, y: 1 };
      const playerPosition = { x: 3, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToLeft());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x - 1);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should move the cargo to right", () => {
      const cargoPosition = { x: 2, y: 1 };
      const playerPosition = { x: 1, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToRight());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x + 1);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should move the cargo to top", () => {
      const cargoPosition = { x: 2, y: 2 };
      const playerPosition = { x: 2, y: 3 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToTop());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y - 1);
    });

    it("should move the cargo to down", () => {
      const cargoPosition = { x: 2, y: 2 };
      const playerPosition = { x: 2, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToDown());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y + 1);
    });

    it("should not move the cargo to left when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 1 };
      const anotherCargoPosition = { x: 1, y: 1 };
      const playerPosition = { x: 3, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);
      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToLeft());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
      expect(store.getState().player.player.x).toBe(playerPosition.x);
      expect(store.getState().player.player.y).toBe(playerPosition.y);
    });

    it("should not move the cargo to right when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 1 };
      const anotherCargoPosition = { x: 3, y: 1 };
      const playerPosition = { x: 1, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToRight());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
      expect(store.getState().player.player.x).toBe(playerPosition.x);
      expect(store.getState().player.player.y).toBe(playerPosition.y);
    });

    it("should not move the cargo to top when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 2 };
      const anotherCargoPosition = { x: 2, y: 1 };

      const playerPosition = { x: 2, y: 3 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToTop());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
      expect(store.getState().player.player.x).toBe(playerPosition.x);
      expect(store.getState().player.player.y).toBe(playerPosition.y);
    });

    it("should not move the cargo to down when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 2 };
      const anotherCargoPosition = { x: 2, y: 3 };
      const playerPosition = { x: 2, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      const { result: player } = setupHooks(usePlayer, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => player.current.resetPlayerPosition(playerPosition));
      act(() => player.current.movePlayerToDown());

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
      expect(store.getState().player.player.x).toBe(playerPosition.x);
      expect(store.getState().player.player.y).toBe(playerPosition.y);
    });
  });
});
