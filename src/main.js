import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  transitions,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VDivider,
  VAlert,
  VProgressCircular,
  VDialog
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    transitions,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VDivider,
    VAlert,
    VProgressCircular,
    VDialog
  },
  theme: {
    primary: colors.red.darken3,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('gc-alert', AlertCmp)
Vue.component('gc-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('gc-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('gc-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('gc-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyApNtJ-9QPfS7h6wEry7NWSe3TsnVAkeDY',
      authDomain: 'vuetify-meeting-app.firebaseapp.com',
      databaseURL: 'https://vuetify-meeting-app.firebaseio.com',
      projectId: 'vuetify-meeting-app',
      storageBucket: 'gs://vuetify-meeting-app.appspot.com'
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
