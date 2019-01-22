import Vue from "vue";
import App from "./App.vue";
import "vue-awesome/icons/trash-alt";
import Icon from "vue-awesome/components/Icon";
import Clipboard from "v-clipboard";

Vue.use(Clipboard);
Vue.config.productionTip = false;
Vue.component("v-icon", Icon);

new Vue({
  render: h => h(App)
}).$mount("#app");
