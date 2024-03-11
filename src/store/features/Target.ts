import { type RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Target {
  x: number;
  y: number;
  id: number;
}

interface TargetState {
  targets: Target[];
}

const initialState: TargetState = {
  targets: [],
};

const TargetReducers = createSlice({
  name: "target",
  initialState,
  reducers: {
    storeAddTargets: (state, action: PayloadAction<Target>) => {
      state.targets.push(action.payload);
    },
    storeCleanTargets: (state) => {
      state.targets = [];
    },
  },
});

export const selectTargets = (state: RootState) => state.targets.targets;

export const { storeAddTargets, storeCleanTargets } = TargetReducers.actions;

export default TargetReducers.reducer;
