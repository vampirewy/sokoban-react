import { beforeEach, describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store/store";
import setupStore from "@/tests/helper/setupStore";
import { setupMap } from "@/store/features/Map";
import { usePlayer } from "../usePlayer";
import { useCargo } from "../useCargo";

describe("usePlayer", () => {
  describe("normal move", () => {
    beforeEach(() => {
      const map = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ];
      const { dispatch } = setupStore();
      dispatch(setupMap(map));
    });

    it("should move to left", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player.x).toBe(0);
      expect(player.current.player.y).toBe(1);
    });

    it("should move to right", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player.x).toBe(2);
      expect(player.current.player.y).toBe(1);
    });

    it("should move to up", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player.x).toBe(1);
      expect(player.current.player.y).toBe(0);
    });

    it("should move to down", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player.x).toBe(1);
      expect(player.current.player.y).toBe(2);
    });
  });

  describe("out of map", () => {
    beforeEach(() => {
      const map = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ];
      const { dispatch } = setupStore();
      dispatch(setupMap(map));
    });

    it("should not move to left when the player is already at the left edge of the map", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 0, y: 0 }));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player.x).toBe(0);
      expect(player.current.player.y).toBe(0);
    });

    it("should not move to right when the player is already at the right edge of the map", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 2, y: 0 }));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player.x).toBe(2);
      expect(player.current.player.y).toBe(0);
    });

    it("should not move to top when the player is already at the top edge of the map", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 0, y: 0 }));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player.x).toBe(0);
      expect(player.current.player.y).toBe(0);
    });

    it("should not move to down when the player is already at the down edge of the map", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 0, y: 2 }));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player.x).toBe(0);
      expect(player.current.player.y).toBe(2);
    });
  });

  describe("wall collision", () => {
    beforeEach(() => {
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      const { dispatch } = setupStore();

      dispatch(setupMap(map));
    });

    it("should not move to left when collision is wall", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToLeft());

      expect(player.current.player.x).toBe(1);
      expect(player.current.player.y).toBe(1);
    });

    it("should not move to right when collision is wall", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 3, y: 1 }));
      act(() => player.current.movePlayerToRight());

      expect(player.current.player.x).toBe(3);
      expect(player.current.player.y).toBe(1);
    });

    it("should not move to top when collision is wall", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToTop());

      expect(player.current.player.x).toBe(1);
      expect(player.current.player.y).toBe(1);
    });

    it("should not move to down when collision is wall", () => {
      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => player.current.resetPlayerPosition({ x: 1, y: 3 }));
      act(() => player.current.movePlayerToDown());

      expect(player.current.player.x).toBe(1);
      expect(player.current.player.y).toBe(3);
    });
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
      dispatch(setupMap(map));
    });

    afterEach(() => {
      const { result: cargo } = renderHook(() => useCargo(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => cargo.current.cleanCargos());
    });

    it("should move the cargo to left", () => {
      const { result: cargo } = renderHook(() => useCargo(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));

      act(() => player.current.resetPlayerPosition({ x: 3, y: 1 }));
      act(() => player.current.movePlayerToLeft());

      expect(store.getState().cargos.cargos[0].x).toBe(1);
      expect(store.getState().cargos.cargos[0].y).toBe(1);
    });

    it("should move the cargo to right", () => {
      const { result: cargo } = renderHook(() => useCargo(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));

      act(() => player.current.resetPlayerPosition({ x: 1, y: 1 }));
      act(() => player.current.movePlayerToRight());

      expect(store.getState().cargos.cargos[0].x).toBe(3);
      expect(store.getState().cargos.cargos[0].y).toBe(1);
    });

    it("should move the cargo to top", () => {
      const { result: cargo } = renderHook(() => useCargo(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 2 })));

      act(() => player.current.resetPlayerPosition({ x: 2, y: 3 }));
      act(() => player.current.movePlayerToTop());

      expect(store.getState().cargos.cargos[0].x).toBe(2);
      expect(store.getState().cargos.cargos[0].y).toBe(1);
    });

    it("should move the cargo to down", () => {
      const { result: cargo } = renderHook(() => useCargo(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      const { result: player } = renderHook(() => usePlayer(), {
        wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 2 })));

      act(() => player.current.resetPlayerPosition({ x: 2, y: 1 }));
      act(() => player.current.movePlayerToDown());

      expect(store.getState().cargos.cargos[0].x).toBe(2);
      expect(store.getState().cargos.cargos[0].y).toBe(3);
    });
  });
});
