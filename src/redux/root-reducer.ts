import { combineReducers } from 'redux';
import { RootState } from 'ReduxTypes';
import { ActionType } from 'typesafe-actions';
import globalReducer from './global/reducers';

const appReducer = combineReducers({
  global: globalReducer,
});

const root_reducer = (state: RootState, action: ActionType<any>) => {
  return appReducer(state, action);
};

export default root_reducer;
