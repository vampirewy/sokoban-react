import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import store from "@/store/store";
import { setupHooks } from "@/tests/helper";
import { useMap } from "../useMap";

describe("use map", () => {
  it("should setup the map", () => {
    const initMap = [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
    ];
    const { result: map } = setupHooks(useMap, true);

    act(() => map.current.setupMap(initMap));

    expect(store.getState().map.map).toMatchInlineSnapshot(`
      [
        [
          1,
          1,
          1,
          1,
          1,
        ],
        [
          1,
          2,
          2,
          2,
          1,
        ],
        [
          1,
          2,
          2,
          2,
          1,
        ],
        [
          1,
          2,
          2,
          2,
          1,
        ],
        [
          1,
          2,
          2,
          2,
          1,
        ],
        [
          1,
          1,
          1,
          1,
          1,
        ],
      ]
    `);
  });
});
