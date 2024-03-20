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

  it("should add line when row is increase", () => {
    const { result: editMap } = setupHooks(() => useEditMap(), true);

    act(() => editMap.current.initEditMap());

    act(() => editMap.current.setRow("10"));

    act(() => editMap.current.updateMapRow());

    expect(editMap.current.storeMap.length).toBe(10);
  });

  it("should remove line when row is decrease", () => {
    const { result: editMap } = setupHooks(() => useEditMap(), true);

    act(() => editMap.current.initEditMap());

    act(() => editMap.current.setRow("2"));

    act(() => editMap.current.updateMapRow());

    expect(editMap.current.storeMap).toMatchInlineSnapshot(`
      [
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
        ],
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
        ],
      ]
    `);
  });
});
