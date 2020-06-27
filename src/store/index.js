import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Empty doll function to reset currentDoll
function defaultCourse(){
  return {
    id: null,
    data:{
      name: '',
      description: '',
      img: '',
      examples: {}
    }
  }
}

// Base URL for Firebase cloudfunctions
const baseURL = 'https://us-central1-ensayoprueba01-eb6f1.cloudfunctions.net/courses'

export default new Vuex.Store({
  state: {
    courses: [],
    loading: false,
    // Saves temporarily new doll data or when editing one
    currentCourse: defaultCourse(),
  },
  mutations: {
    // Toggles loading state
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    // Sets courses into an state array
    GET_COURSES(state, courses){
      state.courses = courses
    },
    // Sets current course info into state
    SET_CURRENT_COURSE(state, course){ state.currentCourse = course },
    // Resets current course info into an empty object
    RESET_CURRENT_COURSE(state){
      state.currentCourse.id = null
      const empty = defaultCourse();
      Object.keys(empty.data).forEach(key => {
        state.currentCourse.data[key] = empty.data[key]
      });
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
    goToCourse({commit, getters}, id){
      commit('SHOW_LOADING')
      let targetCourse = getters.searchCourseById(id)
      commit('SET_CURRENT_COURSE', targetCourse)
    }
  },
  getters: {
    searchCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    },
  }
})
