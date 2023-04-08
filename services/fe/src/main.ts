/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { mockApiWrapper } from './apiWrapper'

import LoadScript from 'vue-plugin-load-script';

const api = new mockApiWrapper()

let app = createApp(App)
app.provide("$api", api)


app.use(LoadScript)

registerPlugins(app)

app.mount('#app')
