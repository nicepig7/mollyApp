import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app.vue'

//import "@asset/style";
import "@/asset/style";

const app = createApp(App)

app.use(createPinia())

app.mount('#app');