import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Base URL for Firebase cloudfunctions
const baseURL = 'https://us-central1-ensayoprueba01-eb6f1.cloudfunctions.net/courses'

export default new Vuex.Store({
  state: {
    courses: [],
    loading: false
  },
  mutations: {
    // Toggles loading state
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    // Sets courses into an state array
    GET_COURSES(state, courses){
      state.courses = courses
    },
  },
  actions: {
    // CRUD: interacting with Firebase
    // Gets all courses from Firebase
    getCourses({commit}){
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/courses`, { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        // Saves info into state and hide spinner
        let data = accept.data
        commit('GET_COURSES', data)
        commit('HIDE_LOADING')
      })
    },
  },
  modules: {
  }
})
