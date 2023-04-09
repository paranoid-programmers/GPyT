/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { api } from './apiWrapper'

// TODO(j.swannack): move to plugins
import LoadScript from 'vue-plugin-load-script'

const app = createApp(App)
app.provide('$api', api)

app.use(LoadScript)

registerPlugins(app)

app.mount('#app')
