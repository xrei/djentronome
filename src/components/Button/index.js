import btn from './Button.vue'

export {
  btn
}

export default function install (Vue) {
  Vue.component(btn.name, btn)
}
