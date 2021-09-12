export interface IStorageItem {
  key: string;
  value: any;
}

export const localStorageSupported =
  typeof window['localStorage'] != 'undefined' && window['localStorage'] != null;

export const StorageHelper = {
  add: (key: string, item: any) => {
    const dataJson = JSON.stringify(item);
    localStorage.setItem(key, dataJson);
  },
  get: (key: string): any | null => {
    try {
      const itemStr = localStorage.getItem(key);
      return itemStr ? JSON.parse(itemStr) : null;
    } catch (err) {
      return localStorage.getItem(key);
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
