import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store/store";

export function setupHooks<T>(hooks: () => T, isNeedWrapper: boolean) {
  const { result } = renderHook(() => hooks(), {
    wrapper: isNeedWrapper
      ? ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>
      : undefined,
  });

  return {
    result,
  };
}
