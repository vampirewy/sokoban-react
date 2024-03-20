import { useEditTarget } from "@/composables/edit/editTarget";
import { setupHooks } from "@/tests/helper";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("use edit target", () => {
  beforeEach(() => {
    const { result: editTarget } = setupHooks(() => useEditTarget(), true);
    act(() => editTarget.current.cleanTarget());
  });

  it("should add target", () => {
    const { result: editTarget } = setupHooks(() => useEditTarget(), true);

    act(() => editTarget.current.addTarget(editTarget.current.createTarget({ x: 1, y: 1 })));

    expect(editTarget.current.storeTargets.length).toBe(1);
  });

  it("should remove target", () => {
    const { result: editTarget } = setupHooks(() => useEditTarget(), true);

    act(() => editTarget.current.addTarget(editTarget.current.createTarget({ x: 1, y: 1 })));
    act(() => editTarget.current.removeTarget(editTarget.current.storeTargets[0]));

    expect(editTarget.current.storeTargets.length).toBe(0);
  });
});
