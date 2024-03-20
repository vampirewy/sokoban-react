import { type RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface EditTarget {
  x: number;
  y: number;
  id: number;
}

interface EditTargetState {
  targets: EditTarget[];
}

const initialState: EditTargetState = {
  targets: [],
};

const EditTargetReducer = createSlice({
  name: "editTarget",
  initialState,
  reducers: {
    storeAddTarget(state, action: PayloadAction<EditTarget>) {
      state.targets.push(action.payload);
    },
    storeRemoveTarget(state, action: PayloadAction<number>) {
      state.targets = state.targets.filter((target) => target.id !== action.payload);
    },
    storeCleanTargets(state) {
      state.targets = [];
    },
  },
});

export const { storeAddTarget, storeRemoveTarget, storeCleanTargets } = EditTargetReducer.actions;

export const selectTargets = (state: RootState) => state.editTarget.targets;

export default EditTargetReducer.reducer;
