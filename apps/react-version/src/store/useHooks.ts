import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch, RootState } from "./store.ts";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
