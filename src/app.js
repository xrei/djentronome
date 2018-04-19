import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

Vue.use(Meta)

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    metaInfo: {
      title: 'Metronome',
      meta: [
        { vmid: 'description', name: 'description', content: 'Metronome app' }
      ],
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'en'
      }
    },
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
