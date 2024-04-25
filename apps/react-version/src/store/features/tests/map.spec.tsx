import { describe, it, expect } from "vitest";
import store from "../../store";
import { storeSetupMap } from "../Map";
import { setupStore } from "@/tests/helper";

describe("map store", () => {
  it("should setup the map", () => {
    const initMap = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const { dispatch } = setupStore();

    dispatch(storeSetupMap(initMap));

    expect(store.getState().map.map).toMatchInlineSnapshot(`
      [
        [
          1,
          1,
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
          1,
          1,
        ],
      ]
    `);
  });
});
