import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from './routes'

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    data: {},
    isLoading: false,
    isLoggedIn: false,
    jwtToken: null,
    errors: []
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => state.jwtToken
  },
  actions: {
    trySignin(context, credentials) {},
    trySignup(context, user) {},
    fetchCurrentUser(context, user) {}
  },
  mutations: {
    signinSucces(state, data) {},
    signupSucces(state, data) {},
    signOut(state) {},
    signError(state, errors) {}
  }
}

