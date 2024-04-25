import { setupStore } from '@/tests/helper';
import { describe, expect, it } from 'vitest';

import store from '../../store';
import { storeSetupMap } from '../Map';

describe('map store', () => {
  it('should setup the map', () => {
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
