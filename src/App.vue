<template>
  <!-- <p>{{formState}}</p> -->
  <!-- <div v-if="formState.user">
    <SignOut />
  </div> -->
  <nav>
    <!-- <router-link to="/user">Profile</router-link> | -->
    <!-- <button v-if="!formState.user">
      <router-link to="/signup">SignUp</router-link>
    </button> |
    <button v-if="!formState.user">
      <router-link to="/signin">SignIn</router-link>
    </button> | -->
  <!-- <button>
    <router-link to="/location">Location</router-link>

  </button> -->

  </nav>
  <router-view/>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
// import SignOut from "./components/SignOut.vue"
// import SignUp from "./components/signUp.vue"

// import Parse from "parse";

export default defineComponent({
  components: {},
  setup() {
    const formState = reactive({
      user:null
    });


    
  

    onMounted(() => {
     
     
    });

    return { formState };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
