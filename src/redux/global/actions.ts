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

export const setSessionAction = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.SESSION_SET, payload });
};

export const setRolesAction = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: GlobalActions.ROLES_SET, payload });
};

export const requestAction =
  (payload: any, responseEvents: any, loading = true) =>
  async (dispatch: Dispatch) => {
    loading && dispatch({ type: GlobalActions.LOADING, payload: true });
    await request(payload, (response: any) => {
      loading && dispatch({ type: GlobalActions.LOADING, payload: false });
      const { data, status } = response;
      const { onSuccess, onError, onFinally } = responseEvents || {};
      switch (status) {
        case 1:
          onSuccess && onSuccess(data);
          break;
        case -1:
          dispatch({ type: GlobalActions.SESSION_SET, payload: null });
          onError && onError(response);
          break;
        default:
          onError && onError(response);
      }
      onFinally && onFinally();
    });
  };
