import { h, createApp } from 'vue';
import App from './index.vue';
import store from './store';

import '@/common.less';
const app = createApp({
  render: () =>
    h(App),
});

app.use(store);
app.mount('#app', false); // 这里需要做判断 ssr/csr 来为 true/false



