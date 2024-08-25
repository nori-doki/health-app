import { createApp } from 'vue';
import App from './App.vue';

// Libraries and plugins
import router from './router';
import PrimeVue from 'primevue/config';

// Style
import '@/style/reset.css';
import '@/style/_global.scss';
import 'primeicons/primeicons.css'


// Components
import Button from 'primevue/button';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component('Button', Button);

app.mount('#app');
