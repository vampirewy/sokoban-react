import { describe, it, expect } from "vitest";
import { setupHooks, setupStore } from "@/tests/helper";
import store from "@/store/store";
import { resetPosition } from "@/store/features/Player";
import { usePosition } from "../usePosition";

describe("use position", () => {
  it("should return the correct position", () => {
    const { dispatch } = setupStore();
    dispatch(resetPosition({ x: 2, y: 2 }));

    const { result: positionResult } = setupHooks(() => usePosition(store.getState().player.player), false);

    expect(positionResult.current.position).toEqual({
      left: "64px",
      top: "64px",
    });
  });
});
