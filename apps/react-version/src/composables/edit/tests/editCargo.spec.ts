import { setupHooks } from "@/tests/helper";
import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useEditCargo } from "../editCargo";
import { useEditMap } from "../editMap";

describe("use edit cargo", () => {
  beforeEach(() => {
    const { result: editMap } = setupHooks(() => useEditMap(), true);
    act(() => editMap.current.initEditMap());
  });

  afterEach(() => {
    const { result: cargos } = setupHooks(() => useEditCargo(), true);
    act(() => cargos.current.cleanCargo());
  });

  it("should add cargo", () => {
    const { result: cargos } = setupHooks(() => useEditCargo(), true);

    act(() => cargos.current.addCargo(cargos.current.createCargo({ x: 1, y: 1 })));

    expect(cargos.current.storeCargos.length).toBe(1);
  });

  it("should remove a cargo", () => {
    const { result: cargos } = setupHooks(() => useEditCargo(), true);

    act(() => cargos.current.addCargo(cargos.current.createCargo({ x: 2, y: 1 })));

    act(() => cargos.current.removeCargo(cargos.current.storeCargos[0]));

    expect(cargos.current.storeCargos.length).toBe(0);
  });
});
