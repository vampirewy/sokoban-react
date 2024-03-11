import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";

export interface Cargo {
  x: number;
  y: number;
  id: number;
  isTarget: boolean;
}

interface CargosState {
  cargos: Cargo[];
}

const initialState: CargosState = {
  cargos: [],
};

const CargosReducer = createSlice({
  name: "cargos",
  initialState,
  reducers: {
    storeAddCargos: (state, action: PayloadAction<Cargo>) => {
      state.cargos.push(action.payload);
    },
    storeMoveCargo: (state, action: PayloadAction<{ cargo: Cargo; dx: number; dy: number; isTarget: boolean }>) => {
      state.cargos = updateCargos(state.cargos, action.payload);
    },
    storeCleanCargos: (state) => {
      state.cargos = [];
    },
  },
});

function updateCargos(
  cargos: Cargo[],
  { cargo, dx, dy, isTarget }: { cargo: Cargo; dx: number; dy: number; isTarget: boolean }
) {
  return cargos.map((c) => {
    if (c.id === cargo.id) {
      return {
        ...c,
        x: c.x + dx,
        y: c.y + dy,
        isTarget,
      };
    }
    return c;
  });
}

export const selectCargos = (state: RootState) => state.cargos.cargos;

export const { storeAddCargos, storeMoveCargo, storeCleanCargos } = CargosReducer.actions;

export default CargosReducer.reducer;
