import { useTarget } from '@/composables/game/useTarget';
import store from '@/store/store';
import { setupHooks } from '@/tests/helper';
import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('use target', () => {
  beforeEach(() => {
    const { result: target } = setupHooks(() => useTarget(), true);
    act(() => target.current.cleanTargets());
  });

  it('should add a target', () => {
    const { result: target } = setupHooks(() => useTarget(), true);

    act(() => target.current.addTarget(target.current.createTarget({ x: 3, y: 3 })));

    expect(store.getState().targets.targets.length).toBe(1);
  });
});
