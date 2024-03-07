import { describe, it, expect } from "vitest";
import store from "../../store";
import { setupMap } from "../Map";
import setupStore from "@/tests/helper/setupStore";

describe("map store", () => {
  it("should setup the map", () => {
    const initMap = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const { dispatch } = setupStore();

    dispatch(setupMap(initMap));

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
