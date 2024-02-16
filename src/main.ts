import { createApp } from 'vue';
import WebFont from 'webfontloader';

import App from './App.vue';
import { useRouter } from './router';
import './assets/styles/scss/index.scss';

WebFont.load({ google: { families: ['Poppins:300,400,500,600,700'] } });

createApp(App).use(useRouter()).mount('#app');
