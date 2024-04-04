// [import] Libraries
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// [import] app.vue
import App from './app.vue'
// [import] common something.
import router from '@common/router';
import fdCompo from '@compo/index';
// [import] common style
import "@style";
// [create] Create Vue
const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(fdCompo)
.mount('#app');

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
    }
}