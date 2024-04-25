import { setupHooks } from '@/tests/helper';
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useEditPlayer } from '../editPlayer';

describe('use edit player', () => {
  it('should remove player', () => {
    const { result: editPlayer } = setupHooks(() => useEditPlayer(), true);

    act(() => editPlayer.current.updatePlayer({ x: 1, y: 1 }));
    act(() => editPlayer.current.removePlayer());

    expect(editPlayer.current.storePlayer).toMatchInlineSnapshot(`
      {
        "x": -1,
        "y": -1,
      }
    `);
  });
});
