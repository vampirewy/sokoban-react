import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/Map";
import PlayerReducer from "./features/Player";
import CargosReducer from "./features/Cargos";

const store = configureStore({
  reducer: {
    map: MapReducer,
    player: PlayerReducer,
    cargos: CargosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
