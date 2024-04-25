import { type Map } from '@/store/features/Map';

let id = 0;

export function generateId() {
  return id++;
}
export interface LevelGameData {
  player: { x: number; y: number };
  map: Map;
  cargos: { x: number; y: number }[];
  targets: { x: number; y: number }[];
}

export type GameData = LevelGameData[];

const firstGameData: LevelGameData = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  player: { x: 1, y: 1 },
  cargos: [
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ],
  targets: [
    { x: 4, y: 4 },
    { x: 4, y: 5 },
  ],
};

const secondGameData: LevelGameData = {
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
      x: 3,
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

export const gameData: GameData = [firstGameData, secondGameData];
