<template>
  <div class="container-header d-flex w-100 flex-row justify-content-center align-items-center p-3">
    <router-link to="/">Vue-JWT</router-link>
    <div class="flex-fill"></div>
    <div class="d-flex flex-row">
      <router-link to="signin" class="mr-2">Connexion</router-link>
      <router-link to="signup">Inscription</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  components: {
    
  }
}
</script>

<style scoped>
.flex-fill {
  flex: auto;
}
.container-header {
  background-color: #273c75;
  color: white;
}
a {
  color: white;
}
</style>