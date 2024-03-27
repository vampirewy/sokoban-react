import { setupHooks } from "@/tests/helper";
import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDrag } from "../useDrag";

describe("use drag", () => {
  const { result: drag } = setupHooks(() => useDrag(), false);

  it("should return true when start drag", () => {
    act(() => drag.current.startDrag());

    expect(drag.current.isDragging()).toBeTruthy();
  });

  it("should return false when stop drag", () => {
    act(() => drag.current.stopDrag());

    expect(drag.current.isDragging()).toBeFalsy();
  });
});
