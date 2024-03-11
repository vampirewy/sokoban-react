import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import store from "@/store/store";
import { setupHooks, setupStore } from "@/tests/helper";
import { useCargo } from "../useCargo";
import { useTarget } from "../useTarget";
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

  describe("push cargo", () => {
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

      const { result: cargo } = setupHooks(useCargo, true);
      act(() => cargo.current.cleanCargos());
    });

    it("should move the cargo to left", () => {
      const cargoPosition = { x: 2, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], -1, 0));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x - 1);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should move the cargo to right", () => {
      const cargoPosition = { x: 2, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x + 1);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should move the cargo to top", () => {
      const cargoPosition = { x: 2, y: 2 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, -1));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y - 1);
    });

    it("should move the cargo to down", () => {
      const cargoPosition = { x: 2, y: 2 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, 1));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y + 1);
    });
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
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], -1, 0));

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
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));

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
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, -1));

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
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, 1));

      expect(cargo.current.storeCargos[0].x).toBe(position.x);
      expect(cargo.current.storeCargos[0].y).toBe(position.y);
    });

    it("should not move the cargo to the left when it hits another cargo", () => {
      const cargoPosition = { x: 2, y: 1 };
      const anotherCargoPosition = { x: 1, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);
      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], -1, 0));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should not move the cargo to right when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 1 };
      const anotherCargoPosition = { x: 3, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should not move the cargo to top when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 2 };
      const anotherCargoPosition = { x: 2, y: 1 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, -1));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });

    it("should not move the cargo to down when the cargo hits another cargo", () => {
      const cargoPosition = { x: 2, y: 2 };
      const anotherCargoPosition = { x: 2, y: 3 };

      const { result: cargo } = setupHooks(useCargo, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo(cargoPosition)));
      act(() => cargo.current.addCargo(cargo.current.createCargo(anotherCargoPosition)));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 0, 1));

      expect(store.getState().cargos.cargos[0].x).toBe(cargoPosition.x);
      expect(store.getState().cargos.cargos[0].y).toBe(cargoPosition.y);
    });
  });

  describe("cargo in the target", () => {
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

    it("the cargo should be in the target", () => {
      const { result: cargo } = setupHooks(useCargo, true);
      const { result: target } = setupHooks(useTarget, true);

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));
      act(() => target.current.addTarget(target.current.createTarget({ x: 1, y: 1 })));

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], -1, 0));

      expect(store.getState().cargos.cargos[0].x).toBe(1);
      expect(store.getState().cargos.cargos[0].isTarget).toBe(true);
    });
  });
});
