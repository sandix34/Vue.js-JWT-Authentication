<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signin</h1>
    <form @submit="trySubmit" class="text-left">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" v-model="form.email" type="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" v-model="form.password" type="password">
      </div>
      <ul v-if="errors.length">
        <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <button class="btn btn-primary">Connexion</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Signin',
  data () {
    return {
      errors: [],
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();     
      if (this.isValid()) {
      console.log(this.form);
      }
    },
    isValid() {
      return true;
    }
  },
}
</script>

<style>
</style>