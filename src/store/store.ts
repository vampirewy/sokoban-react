import { configureStore } from "@reduxjs/toolkit";
import CargosReducer from "./features/Cargos";
import EditELementReducer from "./features/EditElement";
import EditMapReducers from "./features/EditMap";
import EditPlayerReducers from "./features/EditPlayer";
import MapReducer from "./features/Map";
import PlayerReducer from "./features/Player";
import TargetsReducers from "./features/Target";

const store = configureStore({
  reducer: {
    map: MapReducer,
    player: PlayerReducer,
    cargos: CargosReducer,
    targets: TargetsReducers,
    editMap: EditMapReducers,
    editElement: EditELementReducer,
    editPlayer: EditPlayerReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
