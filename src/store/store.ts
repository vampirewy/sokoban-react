import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/Map";
import PlayerReducer from "./features/Player";
import CargosReducer from "./features/Cargos";
import TargetsReducers from "./features/Target";

const store = configureStore({
  reducer: {
    map: MapReducer,
    player: PlayerReducer,
    cargos: CargosReducer,
    targets: TargetsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
