import Vue from "vue";
import axios from "axios";
import store from "./store";

axios.interceptors.request.use(request => {
  const jwtToken = store.getters["user/jwtToken"];
  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return request;
});

Vue.prototype.$http = axios;

export default axios;