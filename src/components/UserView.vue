

<template>
  <div>
    <!-- <p>User view</p> -->
    <div v-if="formState.signup">
      <p>Sign up</p>
      <input v-model="formState.username" placeholder="username" />
      <input v-model="formState.password" placeholder="password" />

      <button @click="Signup">Sign UP</button>
    </div>
    <div v-if="formState.signin">
      <p>Sign In</p>
      <input v-model="formState.username" placeholder="username" />
      <input v-model="formState.password" placeholder="password" />

      <button @click="Signin">Sign In</button>
    </div>
    <div v-if="formState.logout">
      <button @click="Logout">Logout</button>
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

    const Signin = async () => {
      await Parse.User.logIn(formState.username, formState.password).then(
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
    };
    const Logout = async() => {
      const currentUser = Parse.User.current();
      currentUser.set({
        'state':false
      })

      await currentUser.save()
      var ldata = currentUser.get("userLocation");
      console.log(ldata)
      console.log(ldata.pop())

      var data=[]
      var len = ldata.length
      if(len>=1){
      var  myTarget = JSON.parse(JSON.stringify(ldata[len-1]))

      }
      else {
       myTarget = JSON.parse(JSON.stringify(ldata[0]))

      }
      console.log("len",len)
      console.log("mytar",myTarget)
      data.push(myTarget)
      console.log(data)
      // console.log(data)
      
      currentUser.set({
        'userLocation': data,
        'logout':true
      });
     await  currentUser.save()

      Parse.User.logOut().then(() => {
        alert("user logged out");
        location.reload();

        //   const currentUser = Parse.User.current();  // this will now be null
      });
    };

    onMounted(() => {
      const checkUseer = Parse.User.current();
      if (checkUseer) {
        formState.signup = false;
        formState.signin = false;
      } else {
        formState.logout = false;
      }
    });

    return { formState, Signup, Signin, Logout };
  }
});
</script>
    