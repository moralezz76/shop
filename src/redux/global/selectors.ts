import { RootState } from 'ReduxTypes';
import { createSelector } from 'reselect';
import { GlobalState } from './reducers';
const getGlobalState: (s: RootState) => GlobalState = state => state.global;

export const isLoading = createSelector(getGlobalState, state => {
  return state.loading;
});

export const getModals = createSelector(getGlobalState, state => {
  return state.modals;
});

export const getToasts = createSelector(getGlobalState, state => {
  return state.toasts;
});
