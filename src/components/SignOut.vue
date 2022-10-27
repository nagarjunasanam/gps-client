

<template>
  <div>
    <!-- <p>User view</p> -->
    
    
    <div >
      <button @click="Logout">Logout</button>
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
  
    const Logout = async() => {
      const currentUser = Parse.User.current();
      currentUser.set({
        'state':false
      })

      await currentUser.save()
      var ldata = currentUser.get("userLocation");
      console.log(ldata)
      // console.log(ldata.pop())

      var data=[]
      if(ldata){
        var len = ldata.length
   
      }
      console.log("LLLLLLLLLLLLLLLLLL",len)
     if(len>=0){
      if(len>=1){
      var  myTarget = JSON.parse(JSON.stringify(ldata[len-1]))

      }
      else {
       myTarget = JSON.parse(JSON.stringify(ldata[0]))

      }
     }
      // console.log("len",len)
      // console.log("mytar",myTarget)
      data.push(myTarget)
      // console.log(data)
      // console.log(data)
      
      currentUser.set({
        'userLocation': data,
        'logout':true
      });
     await  currentUser.save()

      Parse.User.logOut().then(() => {
        alert("user logged out");
        // location.reload();

        router.push('/')

        //   const currentUser = Parse.User.current();  // this will now be null
      });
    };

    onMounted(() => {
     
    });

    return { formState, Logout };
  }
});
</script>
    