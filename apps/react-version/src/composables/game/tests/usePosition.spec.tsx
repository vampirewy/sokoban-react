import { resetPosition } from '@/store/features/Player';
import store from '@/store/store';
import { setupHooks, setupStore } from '@/tests/helper';
import { describe, expect, it } from 'vitest';

import { usePosition } from '../usePosition';

describe('use position', () => {
  it('should return the correct position', () => {
    const { dispatch } = setupStore();
    dispatch(resetPosition({ x: 2, y: 2 }));

    const { result: positionResult } = setupHooks(
      () => usePosition(store.getState().player.player),
      false,
    );

    expect(positionResult.current.position).toEqual({
      left: '64px',
      top: '64px',
    });
  });
});
