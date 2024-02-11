import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
const app = createApp(App);
app.use(store);
app.use(router);

app.directive('focus', {
    mounted(el) {
      el.focus();
    },
  });

app.mount("#app");
