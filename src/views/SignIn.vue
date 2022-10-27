

<template>
    <div>
   

     
      <div >
       
        <h1>Sign In</h1>
        <form>
          <label>Username:</label>
        <input v-model="formState.username1" placeholder="username" /> <br />
        <label>Password:</label>
        <input v-model="formState.password1" placeholder="password" /> <br /><br />



        </form>
  
        <button @click="Signin">Sign In</button> <span>click to signup <button>
          <router-link to="/">SignUp</router-link> 
    
        </button></span>
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
  
  
      const Signin = async () => {
  
  
        try {
          await Parse.User.logIn(formState.username1, formState.password1).then(
          () => {
            router.push('/location')
            alert("user sign in success");
        const currentUser = Parse.User.current();
            if(currentUser){
              currentUser.set({
          'logout':false
        })
            }
  
            // location.reload();
  
          }
        );
          
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      };
    
  
      onMounted(() => {
       
      });
  
      return { formState, Signin };
    }
  });
  </script>
      