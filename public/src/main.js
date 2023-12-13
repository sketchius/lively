import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
app.use(store);
createApp(App).mount('#app')