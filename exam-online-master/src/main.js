import Vue from 'vue'
import App from './App.vue'
import global from './views/Global.vue'
import router from './router'
import store from './store'
import './plugins/axios.js'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
