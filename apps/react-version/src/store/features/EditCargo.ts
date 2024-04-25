import { type RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface EditCargo {
  x: number;
  y: number;
  id: number;
}

interface EditCargoState {
  cargos: EditCargo[];
}

const initialState: EditCargoState = {
  cargos: [],
};

const EditCargoReducer = createSlice({
  name: "editCargo",
  initialState,
  reducers: {
    storeAddCargo(state, action: PayloadAction<EditCargo>) {
      state.cargos.push(action.payload);
    },
    storeRemoveCargo(state, action: PayloadAction<EditCargo>) {
      state.cargos = state.cargos.filter((cargo) => cargo.id !== action.payload.id);
    },
    storeCleanCargos(state) {
      state.cargos = [];
    },
  },
});

export const { storeAddCargo, storeRemoveCargo, storeCleanCargos } = EditCargoReducer.actions;

export const selectCargos = (state: RootState) => state.editCargo.cargos;

export default EditCargoReducer.reducer;
