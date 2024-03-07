import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";
// import { type PayloadAction } from "@reduxjs/toolkit";

export interface Cargo {
  x: number;
  y: number;
  id: number;
}

interface CargosState {
  cargos: Cargo[];
}

const initialState: CargosState = {
  cargos: [
    {
      x: 2,
      y: 1,
      id: 1,
    },
    {
      x: 2,
      y: 5,
      id: 2,
    },
  ],
};

const CargosReducer = createSlice({
  name: "cargos",
  initialState,
  reducers: {},
});

export const selectCargos = (state: RootState) => state.cargos.cargos;

export default CargosReducer.reducer;
