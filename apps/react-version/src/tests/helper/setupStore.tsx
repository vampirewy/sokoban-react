import store from '@/store/store';
import { useAppDispatch } from '@/store/useHooks';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

let dispatch: any;

export function setupStore() {
  const { result } = renderHook(() => useAppDispatch(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
  dispatch = result.current;

  return {
    dispatch,
  };
}
