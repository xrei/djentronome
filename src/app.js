import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import ga from './ga'

Vue.use(Meta)

export function createApp () {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  ga()

  const app = new Vue({
    metaInfo: {
      title: 'Djentronome',
      meta: [
        { name: 'keywords', content: 'metronome, djentronome, app, online, timing, practice, guitar, music, vue' }
      ],
      titleTemplate: '%s | Free online metronome',
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
