import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import setupStore from "@/tests/helper/setupStore";
import store from "@/store/store";
import { resetPosition } from "@/store/features/Player";
import { usePosition } from "../usePosition";

describe("use position", () => {
  it("should return the correct position", () => {
    const { dispatch } = setupStore();
    dispatch(resetPosition({ x: 2, y: 2 }));

    const { result: positionResult } = renderHook(() => usePosition(store.getState().player.player));

    expect(positionResult.current.position).toEqual({
      left: "64px",
      top: "64px",
    });
  });
});
