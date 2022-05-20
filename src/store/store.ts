import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import authReducer from './auth/authSlice';
import boardReducer from './boards/boardsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> =
  useSelector;
