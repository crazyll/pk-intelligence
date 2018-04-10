import Vuex from 'vuex'
import Vue from 'vue'
import personal from './modules/personal.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV != 'production'
export default new Vuex.Store({
    modules: {
        personal,
        // competition
    },
    strict: debug
})
