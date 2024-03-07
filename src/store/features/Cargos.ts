import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";

export interface Cargo {
  x: number;
  y: number;
  id: number;
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
    storeMoveCargoToLeft: (state, action: PayloadAction<Cargo>) => {
      state.cargos = updateCargos(state.cargos, { ...action.payload, x: action.payload.x - 1 });
    },
    storeMoveCargoToRight: (state, action: PayloadAction<Cargo>) => {
      state.cargos = updateCargos(state.cargos, { ...action.payload, x: action.payload.x + 1 });
    },
    storeMoveCargoToTop: (state, action: PayloadAction<Cargo>) => {
      state.cargos = updateCargos(state.cargos, { ...action.payload, y: action.payload.y - 1 });
    },
    storeMoveCargoToDown: (state, action: PayloadAction<Cargo>) => {
      state.cargos = updateCargos(state.cargos, { ...action.payload, y: action.payload.y + 1 });
    },
    storeCleanCargos: (state) => {
      state.cargos = [];
    },
  },
});

function updateCargos(cargos: Cargo[], c: Cargo) {
  return cargos.map((cargo) => {
    if (cargo.id === c.id) {
      return c;
    }
    return cargo;
  });
}

export const selectCargos = (state: RootState) => state.cargos.cargos;

export const {
  storeAddCargos,
  storeCleanCargos,
  storeMoveCargoToLeft,
  storeMoveCargoToRight,
  storeMoveCargoToTop,
  storeMoveCargoToDown,
} = CargosReducer.actions;

export default CargosReducer.reducer;
