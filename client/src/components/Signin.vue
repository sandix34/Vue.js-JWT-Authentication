<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signin</h1>
    <form @submit="trySubmit" class="text-left">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" v-model="form.email" type="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" v-model="form.password" type="password" />
      </div>
      <ul v-if="errors.length">
        <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <button class="btn btn-primary" :class="{ 'disabled': isLoading }">connexion</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["isLoading", "errors"])
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();
      if (!this.isLoading) {
        this.$store.dispatch("user/trySignin", this.form);
      }
    }
  }
};
</script>

<style scoped>
</style>