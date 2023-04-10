/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { api } from './apiWrapper'

const app = createApp(App)
app.provide('$api', api)


registerPlugins(app)

app.mount('#app')
