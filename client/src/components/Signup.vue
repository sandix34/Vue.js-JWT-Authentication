<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signup</h1>
    <form @submit="trySubmit" class="text-left">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" v-model="form.email" type="text" />
      </div>
      <div class="form-group">
        <label>Username</label>
        <input class="form-control" v-model="form.username" type="text" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" v-model="form.password" type="password" />
      </div>
      <ul v-if="formErrors.length">
        <li class="text-danger" v-for="error in formErrors" :key="error">{{ error }}</li>
      </ul>
      <button class="btn btn-primary" :class="{ 'disabled': isLoading }">signup</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      formErrors: [],
      form: {
        email: "",
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["isLoading", "errors"])
  },
  watch: {
    errors(newValue) {
      this.formErrors = newValue;
    }
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();
      if (this.isValid() && !this.isLoading) {
        console.log(this.form);
        this.$store.dispatch("user/trySignup", this.form);
      }
    },
    isValid() {
      this.formErrors = [];
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.form.email
        )
      ) {
        this.formErrors.push("email non valide");
      }
      return this.formErrors.length === 0;
    }
  }
};
</script>

<style scoped>
</style>