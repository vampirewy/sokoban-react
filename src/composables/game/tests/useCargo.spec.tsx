import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import store from "@/store/store";
import { renderHook, act } from "@testing-library/react";
import { useCargo } from "../useCargo";

describe("use cargo", () => {
  it("should add a cargo", () => {
    const { result: cargo } = renderHook(() => useCargo(), {
      wrapper: ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));

    expect(cargo.current.storeCargos.length).toBe(1);
  });
});
