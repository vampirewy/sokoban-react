import { describe, it, expect, beforeEach } from "vitest";
import store from "../../store";
import setupStore from "@/tests/helper/setupStore";
import { setupMap } from "../Map";
import { moveToDown, moveToLeft, moveToRight, moveToTop, resetPosition } from "../Player";

describe("player store", () => {
  describe("normal move", () => {
    beforeEach(() => {
      const map = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ];
      const { dispatch } = setupStore();
      dispatch(setupMap(map));
    });

    it("should move to the left", () => {
      const { dispatch } = setupStore();
      dispatch(resetPosition({ x: 1, y: 1 }));
      dispatch(moveToLeft());

      expect(store.getState().player.player.x).toBe(0);
      expect(store.getState().player.player.y).toBe(1);
    });

    it("should move to the right", () => {
      const { dispatch } = setupStore();
      dispatch(resetPosition({ x: 1, y: 1 }));
      dispatch(moveToRight());

      expect(store.getState().player.player.x).toBe(2);
      expect(store.getState().player.player.y).toBe(1);
    });

    it("should move to the up", () => {
      const { dispatch } = setupStore();
      dispatch(resetPosition({ x: 1, y: 1 }));
      dispatch(moveToTop());

      expect(store.getState().player.player.x).toBe(1);
      expect(store.getState().player.player.y).toBe(0);
    });

    it("should move to the down", () => {
      const { dispatch } = setupStore();
      dispatch(resetPosition({ x: 1, y: 1 }));
      dispatch(moveToDown());

      expect(store.getState().player.player.x).toBe(1);
      expect(store.getState().player.player.y).toBe(2);
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

      dispatch(setupMap(map));
    });

    it("should not move to left when collision is wall", () => {
      const { dispatch } = setupStore();

      dispatch(resetPosition({ x: 1, y: 1 }));

      dispatch(moveToLeft());

      // expect(store.getState().player.player.x).toBe(1);
      // expect(store.getState().player.player.y).toBe(1);
    });
  });
});
