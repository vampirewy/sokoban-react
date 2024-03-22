import { storeSetupMap } from "@/store/features/Map";
import { setupHooks, setupStore } from "@/tests/helper";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { usePlayer } from "../usePlayer";

const map = [
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
];
const { dispatch } = setupStore();
dispatch(storeSetupMap(map));

describe("usePlayer", () => {
  describe("normal move", () => {
    it("should move to left", () => {
      const { result: player } = setupHooks(usePlayer, true);

      const position = { x: 1, y: 1 };

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.storePlayer.x).toBe(position.x - 1);
      expect(player.current.storePlayer.y).toBe(position.y);
    });

    it("should move to right", () => {
      const position = { x: 1, y: 1 };

      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.storePlayer.x).toBe(position.x + 1);
      expect(player.current.storePlayer.y).toBe(position.y);
    });

    it("should move to up", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.storePlayer.x).toBe(position.x);
      expect(player.current.storePlayer.y).toBe(position.y - 1);
    });

    it("should move to down", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.storePlayer.x).toBe(position.x);
      expect(player.current.storePlayer.y).toBe(position.y + 1);
    });
  });

  describe("at the edge of map", () => {
    it("should not move to left when the player is already at the left edge of the map", () => {
      const position = { x: 0, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to right when the player is already at the right edge of the map", () => {
      const position = { x: 2, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to top when the player is already at the top edge of the map", () => {
      const position = { x: 0, y: 0 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to down when the player is already at the down edge of the map", () => {
      const position = { x: 0, y: 2 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.storePlayer).toEqual(position);
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

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to right when collision is wall", () => {
      const position = { x: 3, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToRight());

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to top when collision is wall", () => {
      const position = { x: 1, y: 1 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToTop());

      expect(player.current.storePlayer).toEqual(position);
    });

    it("should not move to down when collision is wall", () => {
      const position = { x: 1, y: 3 };
      const { result: player } = setupHooks(usePlayer, true);

      act(() => player.current.resetPlayerPosition(position));
      act(() => player.current.movePlayerToDown());

      expect(player.current.storePlayer).toEqual(position);
    });
  });
});
