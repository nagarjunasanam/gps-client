<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <UserView />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import UserView from "../components/UserView.vue"

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    UserView
  }
}
</script>
