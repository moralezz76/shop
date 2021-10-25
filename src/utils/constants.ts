import _ from 'lodash';
/*import { RootState } from 'ReduxTypes';
import { GlobalState } from '../redux/global/reducers';
const getGlobalState: (s: RootState) => GlobalState = state => state.global;*/
import store from '../redux/store';

export const DEF_REQUEST = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'no-cors', // no-cors, *cors, same-origin
  //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export const Randy = (l: number = 8) => {
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let ret: any = [];
  do {
    const ps: any = parseInt(`${Math.random() * _keyStr.length}`);
    const ch = _keyStr[ps];
    if (!ret.includes(ch)) ret.push(ch);
  } while (ret.length < l);
  return ret.join('');
};

export const Crypty = (str: any) =>
  str.split('').reduce((r: any, i: any) => {
    return r + String.fromCharCode(i.charCodeAt(0) ^ 51);
  }, '');

export const fill = (fields: any, values: any) => {
  return Object.keys(fields).reduce((ret: any, key: any) => {
    return { ...ret, [key]: values[key] || '' };
  }, {});
};

export const hasRole: any = (roles: any) => {
  const {
    global: { roles: getRoles },
  } = store.getState();

  if (!roles) return true;
  var result: string[] = _.intersection(getRoles && getRoles.split(','), roles && roles.split(','));
  return !!result.length;
};

export const getPath = (route: any, newP: any) => {
  const { path, params } = route;
  const allP = { ...params, ...newP };
  return Object.keys(params).reduce((ret: string, item: string) => {
    return ret.replace(`:${item}`, allP[item]);
  }, path);
};
