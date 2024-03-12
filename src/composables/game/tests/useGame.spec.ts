import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import store from "@/store/store";
import { useGame } from "../useGame";
import { useMap } from "../useMap";
import { useCargo } from "../useCargo";
import { useTarget } from "../useTarget";
import { setupHooks } from "@/tests/helper";
import { LevelGameData } from "@/game/gameData";

const firstGameData = {
  player: {
    x: 1,
    y: 1,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
};
const secondGameData = {
  player: {
    x: 1,
    y: 1,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 1,
      y: 1,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
};
const gameData = [firstGameData, secondGameData];

describe("use game", () => {
  it("should init game data", () => {
    const { result: game } = setupHooks(() => useGame(), true);
    act(() => game.current.setupGame(gameData));

    expectSetupLevelGameData(firstGameData);
  });

  it('should to next level when click "下一关"', () => {
    const { result: game } = setupHooks(() => useGame(), true);
    act(() => game.current.setupGame(gameData));
    act(() => game.current.toNextLevel());

    expect(game.current.gameStatus.level).toBe(2);
    expectSetupLevelGameData(secondGameData);
  });

  describe("should return isGameCompleted status", () => {
    beforeEach(() => {
      const initMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
      const { result: map } = setupHooks(useMap, true);

      act(() => map.current.setupMap(initMap));

      const { result: cargo } = setupHooks(() => useCargo(), true);
      const { result: target } = setupHooks(() => useTarget(), true);
      act(() => cargo.current.cleanCargos());
      act(() => target.current.cleanTargets());
    });

    it("should return isGameCompleted true when all cargos are on targets", () => {
      const { result: game } = setupHooks(() => useGame(), true);
      const { result: cargo } = setupHooks(() => useCargo(), true);
      const { result: target } = setupHooks(() => useTarget(), true);

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));
      act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 1 })));
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
      act(() => game.current.detectGameCompleted());

      expect(game.current.gameStatus.isGameCompleted).toBe(true);
    });

    it("should return isGameCompleted false when all cargos are not on targets", () => {
      const { result: game } = setupHooks(() => useGame(), true);
      const { result: cargo } = setupHooks(() => useCargo(), true);
      const { result: target } = setupHooks(() => useTarget(), true);

      act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));
      act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 1 })));
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
      act(() => game.current.detectGameCompleted());

      expect(game.current.gameStatus.isGameCompleted).toBe(false);
    });
  });
});

function expectSetupLevelGameData(levelGameData: LevelGameData) {
  expect(store.getState().cargos.cargos.length).toBe(levelGameData.cargos.length);
  expect(store.getState().player.player).toEqual(levelGameData.player);
  expect(store.getState().targets.targets.length).toBe(levelGameData.targets.length);
  expect(store.getState().map.map.length).toBe(levelGameData.map.length);
}
