export {};
declare module 'console' {
  export = typeof import('console');
}
declare global {
  var __DEV__: boolean;
}
__DEV__ = true;
