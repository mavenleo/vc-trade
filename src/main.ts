import { createApp } from 'vue'
import Index from './Index.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



createApp(Index)
    .use(store)
    .mount('#app');


// declare module '@vue/runtime-core' {
//     export interface ComponentCustomProperties {
//         $store: typeof store // use $store globally
//     }
// }




