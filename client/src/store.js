import Vuex from "vuex";
import Vue from "vue";
import axios from "./http";
import router from "./routes";

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    data: {},
    isLoading: false,
    isLoggedIn: localStorage.getItem("jwtToken") ? null : false,
    jwtToken: localStorage.getItem("jwtToken"),
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
        context.commit("updateIsLoading", true);
        const response = await axios.post("/api/auth", credentials);
        context.commit("signinSuccess", response.data);
        router.push("/profile");
      } catch (err) {
        context.commit("signError", err);
      }
    },
    async trySignup(context, user) {
      try {
        context.commit("updateIsLoading", true);
        await axios.post("/api/user", user);
        context.commit("signupSuccess");
        router.push("/signin");
      } catch (err) {
        context.commit("signError", err);
      }
    },
    async fetchCurrentUser(context) {
      try {
        context.commit("updateIsLoading", true);
        const response = await axios.get("/api/user/current");
        context.commit("fetchCurrentUserSuccess", response.data);
      } catch (err) {
        context.commit("signError", err);
      }
    }
  },
  mutations: {
    updateIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.errors = [];
    },
    signError(state, errors) {
      state.isLoading = false;
      state.errors = errors.response.data;
    },
    signinSuccess(state, data) {
      state.isLoading = false;
      state.errors = [];
      state.isLoggedIn = true;
      delete data.user.password;
      state.data = data.user;
      state.jwtToken = data.jwtToken;
      localStorage.setItem("jwtToken", data.jwtToken);
    },
    signOut(state) {
      state.jwtToken = null;
    },
    fetchCurrentUserSuccess(state, user) {
      state.data = user;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.errors = [];
    }
  }
};

const store = new Vuex.Store({
  modules: {
    user
  }
});

export default store;