import { LevelGameData } from '@/game/gameData';
import { setupHooks } from '@/tests/helper';
import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useCargo } from '../useCargo';
import { useGame } from '../useGame';
import { useMap } from '../useMap';
import { usePlayer } from '../usePlayer';
import { useTarget } from '../useTarget';

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

let map: any;
let cargo: any;
let target: any;
let game: any;
let player: any;

describe('use game', () => {
  beforeEach(() => {
    const initMap = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const { result: _map } = setupHooks(useMap, true);
    map = _map;
    const { result: _cargo } = setupHooks(() => useCargo(), true);
    cargo = _cargo;
    const { result: _target } = setupHooks(() => useTarget(), true);
    target = _target;
    const { result: _game } = setupHooks(() => useGame(), true);
    game = _game;
    const { result: _player } = setupHooks(() => usePlayer(), true);
    player = _player;

    act(() => map.current.setupMap(initMap));
    act(() => cargo.current.cleanCargos());
    act(() => target.current.cleanTargets());
  });

  it('should init game data', () => {
    act(() => game.current.setupGame(gameData));

    expectSetupLevelGameData(firstGameData);
  });

  it('should return false when click the "toNextLevel" text', () => {
    act(() => game.current.setupGame(gameData));
    act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));
    act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 1 })));
    act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
    act(() => game.current.detectGameCompleted());
    act(() => game.current.updateGameLevel());
    act(() => game.current.toNextLevel());

    expect(game.current.gameStatus.isGameCompleted).toBeFalsy();
    expectSetupLevelGameData(secondGameData);
  });

  describe('should return isGameCompleted status', () => {
    it('should return isGameCompleted true when all cargos are on targets', () => {
      setCargosInTargets();
      act(() => game.current.detectGameCompleted());

      expect(game.current.gameStatus.isGameCompleted).toBe(true);
    });

    it('should return isGameCompleted false when all cargos are not on targets', () => {
      setCargosInTargets();

      act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
      act(() => game.current.detectGameCompleted());

      expect(game.current.gameStatus.isGameCompleted).toBe(false);
    });
  });

  it('should level up when isGameCompleted was true', () => {
    setCargosInTargets();

    act(() => game.current.detectGameCompleted());
    act(() => game.current.updateGameLevel());

    expect(game.current.gameStatus.level).toBe(2);
  });
});

function expectSetupLevelGameData(levelGameData: LevelGameData) {
  expect(cargo.current.storeCargos.length).toBe(levelGameData.cargos.length);
  expect(target.current.storeTargets.length).toBe(levelGameData.targets.length);
  expect(map.current.storeMap.length).toBe(levelGameData.map.length);
  expect(player.current.storePlayer).toEqual(levelGameData.player);
}

function setCargosInTargets() {
  act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));
  act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 1 })));
  act(() => cargo.current.moveCargo(cargo.current.storeCargos[0], 1, 0));
}
