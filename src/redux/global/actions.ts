import { Dispatch } from 'redux';
import { request } from '../../utils/request';
import { GlobalActions } from './types';

export const setLoadingAction = (payload: boolean) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.LOADING, payload });
};

export const addModalAction = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.MODAL_ADD, payload });
};

export const removeModalAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.MODAL_REMOVE });
};

export const addToastAction = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.TOAST_ADD, payload });
};

export const removeToastAction = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.TOAST_REMOVE, payload });
};

export const requestAction =
  (payload: any, responseEvents: any, loading = true) =>
  async (dispatch: Dispatch) => {
    console.log(loading);
    loading && dispatch({ type: GlobalActions.LOADING, payload: true });
    await request(payload, (response: any) => {
      loading && dispatch({ type: GlobalActions.LOADING, payload: false });
      const { data, status } = response;
      const { onSuccess, onError } = responseEvents || {};
      switch (status) {
        case 1:
          onSuccess && onSuccess(data);
          break;
        default:
          onError && onError(response);
      }
    });
  };
