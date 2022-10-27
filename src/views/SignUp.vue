

<template>
    <div>
    <router-link to="/signin">SignUp</router-link> |

      <!-- <p>User view</p> -->
      <div v-if="formState.signup">
        <p>Sign up</p>
        <input v-model="formState.username" placeholder="username" />
        <input v-model="formState.password" placeholder="password" />
  
        <button @click="Signup">Sign UP</button>
      </div>
      
    </div>
  </template>
      
      <script>
  import { defineComponent, reactive, onMounted } from "vue";
  
  import Parse from "parse";
  
  export default defineComponent({
    components: {},
    setup() {
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
            location.reload();
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
      