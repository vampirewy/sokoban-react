import { describe, it, expect, beforeEach } from "vitest";
import store from "../../store";
import { setupStore } from "@/tests/helper";
import { storeSetupMap } from "../Map";
import { moveDistance, resetPosition } from "../Player";

describe("player store", () => {
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

    it("should move to the left", () => {
      const position = { x: 1, y: 1 };

      const { dispatch } = setupStore();

      dispatch(resetPosition(position));
      dispatch(moveDistance({ x: -1, y: 0 }));

      expect(store.getState().player.player.x).toBe(position.x - 1);
      expect(store.getState().player.player.y).toBe(position.y);
    });

    it("should move to the right", () => {
      const position = { x: 1, y: 1 };

      const { dispatch } = setupStore();

      dispatch(resetPosition(position));
      dispatch(moveDistance({ x: 1, y: 0 }));

      expect(store.getState().player.player.x).toBe(position.x + 1);
      expect(store.getState().player.player.y).toBe(position.y);
    });

    it("should move to the up", () => {
      const position = { x: 1, y: 1 };

      const { dispatch } = setupStore();

      dispatch(resetPosition(position));
      dispatch(moveDistance({ x: 0, y: -1 }));

      expect(store.getState().player.player.x).toBe(position.x);
      expect(store.getState().player.player.y).toBe(position.y - 1);
    });

    it("should move to the down", () => {
      const position = { x: 1, y: 1 };

      const { dispatch } = setupStore();

      dispatch(resetPosition(position));
      dispatch(moveDistance({ x: 0, y: 1 }));

      expect(store.getState().player.player.x).toBe(position.x);
      expect(store.getState().player.player.y).toBe(position.y + 1);
    });
  });
});
