import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import store from "@/store/store";
import { useTarget } from "@/composables/game/useTarget";
import { setupHooks } from "@/tests/helper";

describe("use target", () => {
  beforeEach(() => {
    const { result: target } = setupHooks(() => useTarget(), true);
    act(() => target.current.cleanTargets());
  });

  it("should add a target", () => {
    const { result: target } = setupHooks(() => useTarget(), true);

    act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 3 })));

    expect(store.getState().targets.targets.length).toBe(1);
  });
});
