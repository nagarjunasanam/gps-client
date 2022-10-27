

<template>
    <div>
    <router-link to="/signup">SignUp</router-link> |

     
      <div >
        <p>Sign In</p>
        <input v-model="formState.username1" placeholder="username" />
        <input v-model="formState.password1" placeholder="password" />
  
        <button @click="Signin">Sign In</button>
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
  
  
      const Signin = async () => {
  
  
        try {
          await Parse.User.logIn(formState.username1, formState.password1).then(
          () => {
            alert("user sign in success");
        const currentUser = Parse.User.current();
            if(currentUser){
              currentUser.set({
          'logout':false
        })
            }
  
            location.reload();
  
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
      