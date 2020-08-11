import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

window.addEventListener('beforeunload', () => localStorage.setItem('list', JSON.stringify(store.state.list)))

window.addEventListener('load', () => {
  const list = JSON.parse(localStorage.getItem('list'))
  if(list.length > 0) store.state.list = list;
})

