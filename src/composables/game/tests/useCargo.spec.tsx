import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { setupHooks } from "@/tests/helper";
import { useCargo } from "../useCargo";

describe("use cargo", () => {
  it("should add a cargo", () => {
    const { result: cargo } = setupHooks(useCargo, true);

    act(() => cargo.current.addCargo(cargo.current.createCargo({ x: 2, y: 1 })));

    expect(cargo.current.storeCargos.length).toBe(1);
  });
});
