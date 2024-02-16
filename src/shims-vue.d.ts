/* eslint-disable */
// This is required to avoid errors raised by tsc & vue-tsc e.g. 'vue-tsc js emit is not supported'
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
