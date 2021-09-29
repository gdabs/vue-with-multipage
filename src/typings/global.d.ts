import { App } from 'vue';

declare global {
  interface Window {
    __VUE_APP__: App;
  }
  var __VUE_PROD_DEVTOOLS__: boolean;
}

declare module '*.less';
