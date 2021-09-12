/*declare module 'Utilities2' {
  let i18n = import('./i18n').default;
  export default i18n;
}*/

declare module 'Utilities2' {
  let I18n = import('./i18n').default;
  export type I18nT = I18n<typeof I18n>;
}
