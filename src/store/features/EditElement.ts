import { type RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface StoreEditElement {
  name: string;
  img: string;
}

interface EditElementState {
  currentEditElement: StoreEditElement;
}
const initialState: EditElementState = {
  currentEditElement: {
    name: "",
    img: "",
  },
};

const editElementReducer = createSlice({
  name: "editElement",
  initialState,
  reducers: {
    storeSetCurrentEditElement(state, action: PayloadAction<StoreEditElement>) {
      state.currentEditElement = action.payload;
    },
  },
});

export const { storeSetCurrentEditElement } = editElementReducer.actions;

export const selectCurrentEditElement = (state: RootState) => state.editElement.currentEditElement;

export default editElementReducer.reducer;
