import { combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import userReducer from './user/userStore';

const rootReducer = combineReducers({
  user: userReducer
});

export const setupStore = () => {
  const reducer = (state: any, action: any) => {
    return rootReducer(state, action);
  }
  return configureStore({
    reducer
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export default setupStore();