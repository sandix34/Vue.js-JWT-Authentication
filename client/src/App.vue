<template>
<div id="app">
  <TheHeader></TheHeader>
  <div class="d-flex flex-column w-100">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import TheHeader from './components/TheHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    TheHeader
  },
  computed: {
    ...mapGetters('user', ['jwtToken'])
  },
  beforeMount() {
    if (this.jwtToken) {
      this.$store.dispatch('user/fetchCurrentUser');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>
