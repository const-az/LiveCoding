import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// User functions
// Saves user on storage
function setInStorage(key, obj){
  localStorage.setItem(key, JSON.stringify(obj))
}
// Gets user from storage
function getFromStorage(key){
  return JSON.parse(localStorage.getItem(key))
}

// Current Course functions
// Empty course function to reset currentCourse
function defaultCourse(){
  return {
    id: null,
    data:{
      name: '',
      description: '',
      img: '',
    },
    examples: {}
  }
}

// Base URL for Firebase cloudfunctions
const baseURL = 'https://us-central1-ensayoprueba01-eb6f1.cloudfunctions.net/courses'

export default new Vuex.Store({
  state: {
    courses: [],
    // State toggles
    loading: false,
    edit: false,
    messageModal: false,
    // User info
    currentUser: getFromStorage('user') || undefined,
    // Current course info
    currentCourse: defaultCourse()
  },
  mutations: {
    // Toggles loading state
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    // Toggles edit state when editing or deleting a doll
    TRUE_EDIT(state){ state.edit = true },
    FALSE_EDIT(state){ state.edit = false },
    // Toggles message modal states when deleting a doll
    SHOW_MESSAGE_FORM(state){ state.messageModal = true },
    HIDE_MESSAGE_FORM(state){ state.messageModal = false },
    // Sets courses into an state array
    GET_COURSES(state, courses){
      state.courses = []
      courses.forEach(course => {
        course.link = course.data.name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 -]/,"")
          .replace(/\s/g, "-");
        state.courses.push(course)
      })
    },
    // Sets current course info into state
    SET_CURRENT_COURSE(state, course){ state.currentCourse = course },
    // Resets current course info into an empty object
    RESET_CURRENT_COURSE(state){
      state.currentCourse.id = null
      state.currentCourse.examples = {}
      const empty = defaultCourse();
      Object.keys(empty.data).forEach(key => {
        state.currentCourse.data[key] = empty.data[key]
      });
    },
    // Saves user information
    UPDATE_USER(state, user){
      state.currentUser = user
      setInStorage('user', user)
    },
    // Updates doll info from inputs to state
    UPDATE_NAME(state, name){ state.currentCourse.data.name = name },
    UPDATE_IMAGE(state, img){ state.currentCourse.data.img = img },
    UPDATE_DESCRIPTION(state, description){ state.currentCourse.data.description = description },
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
        commit('RESET_CURRENT_COURSE')
        commit('HIDE_LOADING')
      })
    },
    // Post a course into Firebase
    postCourse({dispatch, commit, state}){
      // If editing
      if(state.currentCourse.id!=null){
        axios.put(`${baseURL}/course/${state.currentCourse.id}`, state.currentCourse.data)
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getCourses')
        })
      }else{
        // If it's a new course
        axios.post(`${baseURL}/course`, state.currentCourse.data )
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getCourses')
        })
      }
    },
    // Gets info about selected doll for editing
    editCourse({commit}, id){
      // When has to get it from Firebase
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/course/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        commit('SET_CURRENT_COURSE', response.data)
      })
    },
    // Ask for confirmation when deleting option selected
    deleteConfirmation({commit, state}, id){
      state.currentCourse.id = id
      commit('SHOW_MESSAGE_FORM')
    },
    // Deletes course information from Firebase
    deleteCourse({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('SHOW_LOADING')
       axios.delete(`${baseURL}/course/${state.currentCourse.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getCourses')
          commit('HIDE_LOADING')
          commit('SHOW_MESSAGE_FORM')
          commit('RESET_CURRENT_COURSE')
        })
    },
    // Closes informative message when course is deleted
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_CURRENT_COURSE')
    },
    // Resets form when not sent
    resetForm({commit}){
      commit('RESET_CURRENT_COURSE')
    },
    // Save user
    updateUser({commit}, user){ 
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Updates data from inputs to state
    updateName({commit}, name){ commit('UPDATE_NAME', name) },
    updateImage({commit}, img){ commit('UPDATE_IMAGE', img) },
    updateDescription({commit}, description){ commit('UPDATE_DESCRIPTION', description) },
  },
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  }
})
