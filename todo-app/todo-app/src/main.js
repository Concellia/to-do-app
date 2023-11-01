import { createApp } from 'vue';
import 'v-calendar/dist/style.css';
import './style.css';
import UUID from "vue-uuid";
import VCalendar from 'v-calendar';
import router  from './router';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import App from './App.vue';

library.add(fas);
library.add(far);

const app = createApp(App)
app.component('fa',FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(UUID)
app.use(VCalendar, {})
app.mount('#app')

