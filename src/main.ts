import { createApp } from 'vue';
import { MotionPlugin} from '@vueuse/motion';
import App from './App.vue';
import router from './router'; // Import the router configuration
import './styles/main.css';
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";


const options: PluginOptions = {
    // You can set your default options here
};

const app = createApp(App);

app.use(MotionPlugin);
app.use(router);
app.use(Toast, options); // Include the toast plugin here
app.mount('#app');




