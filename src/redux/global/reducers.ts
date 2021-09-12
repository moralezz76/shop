import { handleActions } from 'redux-actions';
import { ActionType } from 'typesafe-actions';
import { GlobalActions } from './types';

const initialState = {
  loading: false,
  modals: [],
  toasts: [],
};

export type GlobalState = typeof initialState;

const globalReducer = handleActions<GlobalState, ActionType<any>>(
  {
    [GlobalActions.LOADING]: (state, { payload: loading }) => {
      return { ...state, loading };
    },
    [GlobalActions.MODAL_ADD]: (state, { payload: modal }) => {
      const { modals: _modals } = state;
      const modals: any = [..._modals, modal];
      return { ...state, modals };
    },
    [GlobalActions.MODAL_REMOVE]: state => {
      const { modals } = state;
      modals.pop();
      return { ...state, modals: [...modals] };
    },
    [GlobalActions.TOAST_ADD]: (state, { payload: toast }) => {
      const { toasts: _toasts } = state;
      toast.id = `i${Math.random()}`;
      const toasts: any = [..._toasts, toast];
      return { ...state, toasts };
    },
    [GlobalActions.TOAST_REMOVE]: (state, { payload: _id }) => {
      const { toasts: _toasts } = state;
      const toasts = _toasts.filter(({ id }: any) => id !== _id);
      return { ...state, toasts: [...toasts] };
    },
  },
  initialState
);

export default globalReducer;
