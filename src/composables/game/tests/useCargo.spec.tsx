import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { setupHooks, setupStore } from "@/tests/helper";
import { useCargo } from "../useCargo";
import { storeSetupMap } from "@/store/features/Map";

describe("use cargo", () => {
  beforeEach(() => {
    const { result: cargo } = setupHooks(useCargo, true);

    act(() => cargo.current.cleanCargos());
  });

  it("should add a cargo", () => {
    const { result: cargo } = setupHooks(useCargo, true);

    act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));

    expect(cargo.current.storeCargos.length).toBe(1);
  });

  describe("should not move cargo", () => {
    beforeEach(() => {
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      const { dispatch } = setupStore();

      dispatch(storeSetupMap(map));
    });

    it("should not move cargo to left when collision wall", () => {
      const position = {
        x: 1,
        y: 1,
      };
      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(position)));
      act(() => cargo.current.moveCargoToLeft(cargo.current.storeCargos[0]));

      expect(cargo.current.storeCargos[0].x).toBe(position.x);
      expect(cargo.current.storeCargos[0].y).toBe(position.y);
    });

    it("should not move cargo to right when collision wall", () => {
      const position = {
        x: 3,
        y: 1,
      };
      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(position)));
      act(() => cargo.current.moveCargoToRight(cargo.current.storeCargos[0]));

      expect(cargo.current.storeCargos[0].x).toBe(position.x);
      expect(cargo.current.storeCargos[0].y).toBe(position.y);
    });

    it("should not move cargo to top when collision wall", () => {
      const position = {
        x: 1,
        y: 1,
      };
      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(position)));
      act(() => cargo.current.moveCargoToTop(cargo.current.storeCargos[0]));

      expect(cargo.current.storeCargos[0].x).toBe(position.x);
      expect(cargo.current.storeCargos[0].y).toBe(position.y);
    });

    it("should not move cargo to down when collision wall", () => {
      const position = {
        x: 1,
        y: 3,
      };
      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(position)));
      act(() => cargo.current.moveCargoToDown(cargo.current.storeCargos[0]));

      expect(cargo.current.storeCargos[0].x).toBe(position.x);
      expect(cargo.current.storeCargos[0].y).toBe(position.y);
    });
  });
});
