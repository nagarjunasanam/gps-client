

<template>
    <div>
     

      <!-- <p>User view</p> -->
      <div v-if="formState.signup">
        <h1>Sign up</h1>
        <label>Username:</label>
        <input v-model="formState.username" placeholder="username" />
        <br />
        <label>Password:</label>
        <input v-model="formState.password" placeholder="password" />
        <br />
  
        <button @click="Signup">Sign UP</button><br/> <span>Already an ccount <router-link to="/signin">SignIn</router-link></span> 
      </div>
      
    </div>
  </template>
      
      <script>
  import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
  
  import Parse from "parse";
  
  export default defineComponent({
    components: {},
    setup() {
        const router = useRouter()
      const formState = reactive({
        username: "",
        password: "",
        username1: "",
        password1: "",
        signup: true,
        signin: true,
        logout: true,
        show: true
      });
      const Signup = async () => {
        const user = new Parse.User();
        user.set("username", formState.username);
        user.set("password", formState.password);
  
        // other fields can be set just like with Parse.Object
  
        try {
          await user.signUp().then(() => {
            alert("user created");
            (formState.username = ""), (formState.password = "");
            // location.reload();
            router.push('/signin')

          });
          // Hooray! Let them use the app now.
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      };
  

   
  
      onMounted(() => {
      
      });
  
      return { formState,Signup  };
    }
  });
  </script>
      