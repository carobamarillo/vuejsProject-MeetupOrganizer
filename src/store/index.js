import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup/index'
import user from './user/index'
import shared from './shared/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared
  }
})
