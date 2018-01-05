/* eslint-disable no-new */
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alertcmp from './components/Shared/alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(Vuetify, {
  theme: {
    primary: '#d84315',
    secondary: '#b0bec5',
    accent: '#d84315',
    error: '#bf360c',
    deep_orange_darken_2: '#e64a19'
  }
})
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alertcmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCWFqUcbg9d6hR84PFQGNLiwYoPAmoQrew',
      authDomain: 'yt-devmetup.firebaseapp.com',
      databaseURL: 'https://yt-devmetup.firebaseio.com',
      projectId: 'yt-devmetup',
      storageBucket: 'gs://yt-devmetup.appspot.com/'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
