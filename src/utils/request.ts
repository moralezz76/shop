import { Dashboard } from '../views';
import { StorageHelper as storage, StorageHelper } from './StorageHelper';

const apiPath = 'http://localhost:8000';
const apiVer = 'api/v1';

export const menus = [
  {
    type: 'gear',
    title: 'Dashboard',
    route: '/dashboard',
  },
  {
    type: 'gear',
    title: 'Users',
    route: '/users',
  },
  {
    type: 'shutdown',
    title: 'Disconnect',
    onClick: (props: any) => {
      const { request } = props;
      request({ name: 'logout.get' });
      StorageHelper.clear();
    },
  },
];

export const routes: any = [
  {
    uri: '/dashboard',
    view: Dashboard,
  },
];

export const req: any = {
  'login.get': {
    url: 'session/login',
  },
  'logout.get': {
    url: 'session/logout',
  },
  'social.post': {
    url: 'session/social',
    method: 'POST',
  },
  'product.post': {
    url: 'product/create',
    method: 'POST',
  },
};

const createUrl = (url: string, fields: string[]) => {
  let path = `${apiPath}/${apiVer}/${url}`;

  for (let field in fields) {
    const newPath = path.replace(`:${field}`, field);
    if (newPath !== path) {
      delete fields[field];
      path = newPath;
    }
  }

  return path;
};

export const request = async (values: any, cb?: (r?: any) => void) => {
  const { name, fields = {} } = values;
  const { url, method = 'GET' } = req[name] || {};

  const uri = createUrl(url, fields);
  const token = storage.get('token');

  //console.log(uri, token);

  await fetch(uri, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { token }),
    },
    ...(Object.keys(fields).length && { body: JSON.stringify(fields) }),
  })
    .then(res => res.json())
    .then(
      (result: any) => {
        const { status, token } = result;
        switch (status) {
          case 1: // SUCCESS
            token && storage.add('token', token);
            break;
          case -1: // TOKEN FAILED
            storage.clear(); // REMOVE ALL
        }
        cb && cb(result);
      },

      (error: any) => {
        cb && cb({ status: -2, data: error });
      }
    );
};
