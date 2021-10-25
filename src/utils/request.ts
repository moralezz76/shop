import moment from 'moment';
import { Dashboard, LogDetails, LogsView, UsersView } from '../views';
import { Crypty, Randy } from './constants';
import Storage from './StorageHelper';

export const apiPath = 'http://localhost:8000';
const apiVer = 'api/v1';

export const menus = [
  {
    type: 'dashboard',
    title: 'Dashboard',
    route: '/dashboard',
  },
  {
    type: 'users',
    title: 'Users',
    route: '/users/:page',
    roles: 'admin',
    def: {
      page: 1,
    },
  },
  {
    type: 'products',
    title: 'Products',
    route: '/products',
    roles: 'user',
  },
  {
    type: 'logs',
    title: 'Logs',
    route: '/logs/:date/user/:user/:page',
    def: {
      date: moment().format('YMMDD'),
      user: 'all',
      page: 1,
    },
    roles: 'admin',
  },
];

export const routes: any = [
  {
    uri: '/dashboard',
    view: Dashboard,
  },

  { uri: '/users/:page', view: UsersView },
  {
    uri: '/logs/:date/user/:user/:page',
    view: LogsView,
  },
  {
    uri: '/logs/file/:path',
    view: LogDetails,
  },
];

export const req: any = {
  'login.get': {
    url: 'session/login',
  },
  'logout.get': {
    url: 'session/logout',
  },
  'users.get': {
    url: 'users/all',
  },
  'social.post': {
    url: 'session/social',
    method: 'POST',
  },
  'product.post': {
    url: 'product/create',
    method: 'POST',
  },
  'product.get': {
    url: 'product/all',
  },
  'logs.get': {
    url: 'logs/get/:date/:user',
  },
  'log-details.get': {
    url: 'logs/details/:path',
  },
  'log-users-options.get': {
    url: 'logs/users/options',
  },
  'log-dates-options.get': {
    url: 'logs/users/dates',
  },
};

const createUrl = (url: string, method: string, fields: string[]) => {
  let path = `${apiPath}/${apiVer}/${url}`;

  for (let field in fields) {
    const newPath = path.replace(`:${field}`, fields[field]);
    if (newPath !== path) {
      delete fields[field];
      path = newPath;
    }
  }
  if (method === 'GET') {
    const str = Object.keys(fields).reduce((ret: any, key: any) => {
      return ret + (ret === '' ? '' : '&') + `${key}=${fields[key]}`;
    }, '');
    path += str && `?${str}`;
  }
  return path;
};

export const request = async (nfo: any, cb?: (r?: any) => void) => {
  const { name, fields = {} } = nfo;

  const { url, method = 'GET', def } = req[name] || {};

  const uri = createUrl(url, method, { ...def, ...fields });
  const token = Storage.get('token');

  let requestToken: any = '';
  const randy = fields.data_token || Randy();
  requestToken = btoa(Crypty(`${moment().unix()}.${randy}`));

  await fetch(uri, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'request-token': requestToken,
      ...(token && { token }),
    },
    ...(Object.keys(fields).length &&
      !['GET', 'HEAD'].includes(method) && { body: JSON.stringify(fields) }),
  })
    .then(res => res.json())
    .then(
      (result: any) => {
        const { status, token } = result;
        switch (status) {
          case 1: // SUCCESS
            token && Storage.add('token', token);
            break;
          case -1: // TOKEN FAILED
            Storage.clear(); // REMOVE ALL
        }
        cb && cb(result);
      },

      (error: any) => {
        console.log(error);
        cb && cb({ status: -2, data: error });
      }
    );
};
