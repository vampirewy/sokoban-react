import { setupHooks } from "@/tests/helper";
import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEditMap } from "../editMap";

describe("use edit map", () => {
  it("should init edit map", () => {
    const { result: editMap } = setupHooks(() => useEditMap(), true);

    act(() => editMap.current.initEditMap());

    expect(editMap.current.storeMap.length).toEqual(8);
  });
});
