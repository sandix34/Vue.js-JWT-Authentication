<template>
  <div class="card p-4 d-flex flex-colums">
    <div>email : {{ user.email }}</div>
    <div>username : {{ user.username }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters('user', { user: 'currentUser' })
  },
}
</script>

<style>
</style>