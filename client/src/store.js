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
    isLoading: state => state.isLoading,
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => state.jwtToken
  },
  actions: {
    async trySignin(context, credentials) {
      try {
        context.commit('updateIsLoading', true);
        const response = await axios.post("/api/auth", credentials);
        context.commit('signinSucces', response.data);
        router.push('profile');
      } catch(err) {
        context.commit("signError", err)
      }
    },
    async trySignup(context, user) {
      try {
        context.commit('updateIsLoading', true);
        await axios.post("/api/user", user);
        context.commit("signupSucces");
        router.push("/signin");
      } catch(err) {
        context.commit("signError", err)
      }

    },
    async fetchCurrentUser(context) {
      try {
        context.commit('updateIsLoading', true);
        const user = await axios.get("/api/user/current");
        context.commit('fetchCurrentUserSuccess', user);
      } catch(err) {
        context.commit("signError", err)
      }
    } 
  },
  mutations: {
    updateIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    signupSucces(state) {
      state.isLoading = false;
      state.errors = null;
    },
    signError(state, errors) {
      console.log(errors);
      state.errors = errors.response.data;
      state.isLoading = false;
    },
    signinSucces(state, data) {
      state.isLoading = false;
      state.errors = null;
      state.isLoggedIn = true;
      delete data.user.password;
      state.data = data.user;
      state.jwtToken = data.jwtToken;
    },
    signOut(state) {
      state.jwtToken = null;
    },
    fetchCurrentUserSuccess(state) {
      state.data = user;
      state.isLoading = false;
      state.errors = null;
    }
  }
}

const store = new Vuex.Store({
  modules: {
    user
  }
});

export default store;