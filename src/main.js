import { createApp } from 'vue';
import App from './App.vue';
import registerGlobalComponents from './globalComponents.js';

// Libraries and plugins
import router from './router';
import PrimeVue from 'primevue/config';
import 'webkul-micron/dist/script/micron.min.js';
import 'webkul-micron/dist/css/micron.min.css';

// Style
import 'primeicons/primeicons.css'


// Components
import Button from 'primevue/button';

// My Components

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component('Button', Button);


registerGlobalComponents(app);

app.mount('#app');
