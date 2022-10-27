

<template>
  <div>
    <!-- <p>{{formState.user && !formState.sharing ? "Sharing Location........" : "Stopped Location................."}}</p> -->
    <h1>{{formState.user ? "":"Sign to share Location"}}</h1>
    <div v-if="formState.user">
      <button v-if="formState.stop "  @click="stopLocation()">STOP</button>
    <button v-if="formState.start  " @click="startLocation()">START</button>
    </div>
<p>{{formState.data}}</p>
<p v-if="formState.data.length >=1">{{formState.data[formState.data.length-1]}}</p>
    <!-- <userView /> -->
    <!-- <button @click="getLocation()">Track Location</button> -->
    
    <GoogleMap  
     v-if="formState.showMap"
      api-key="AIzaSyABPywZVGnAsgP8llgiBFnx8sAvUUiRyv4"
      style="width: 100%; height: 500px"
      :center="formState.center"
      :zoom="25"
    >
      <Polyline v-if="formState.loader" :options="line.flightPath" />
      <Marker v-if="formState.loader" :options="{ position: formState.center }" />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { GoogleMap, Marker, Polyline } from "vue3-google-map";

import Parse from "parse";
import User from "../server/user";
// import userView from "./UserView.vue";
// import Parse from "parse";

export default defineComponent({
  components: { GoogleMap, Marker, Polyline },
  setup() {
    const currentUser = Parse.User.current();

    const center = { lat: 40.689247, lng: -74.044502 };
    const formState = reactive({
      image: "",
      center: { lat: 40.689247, lng: -74.044502 },
      loader: false,
      data: [],
      getData:[],
      flag:false,
      sharing:false,
      start:null,
      stop:null,
      user:null,
      showMap:false
    });
    const line = reactive({
      flightPath: {
        path: formState.data,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
    });
  
    onMounted(async () => {
      const currentUser = Parse.User.current();
      if(currentUser){
        formState.start=true
        formState.stop=false,
        formState.user=true
      }
      // const currentUser = Parse.User.current();
      // await User.getPointer(currentUser.id).then((obj)=>{
      //   var ldata =  currentUser.get('userLocation')
      // })

      // if(currentUser){
      //   var ldata =  currentUser.get('userLocation')
      //    console.log("ldata",ldata)
      //    formState.data=currentUser.get('userLocation')
      //    console.log(formState.data[0])
      // }

      // getLocation();


     
      // window.setInterval(() => {
      //   navigator.geolocation.getCurrentPosition(() => {});
      //   getLocation();
      // }, 9000); 
    });

    const updateLocation = async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(position => {
          formState.data.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          formState.center.lat = position.coords.latitude;
          formState.center.lng = position.coords.longitude;
        });
      }
    };

    const getLocation = async () => {
      const checkUseer = Parse.User.current();
      formState.loader = false;
      if(checkUseer){
        if (navigator.geolocation) {
          
        // console.log("h")
        await navigator.geolocation.getCurrentPosition(async position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          console.log(formState.data)
     
          let myTarget = JSON.parse(JSON.stringify(formState.data))
          console.log(myTarget)
          formState.data.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          formState.getData.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });

          // console.log(formState.center.lat)
          formState.center.lat = position.coords.latitude;
          formState.center.lng = position.coords.longitude;
               //show map
          formState.showMap=true
          
          // const currentUser = Parse.User.current();
          console.log("curremt user",currentUser.get("username"),currentUser.id)
          await User.getPointer(currentUser.id).then(obj => {
            currentUser.set({
              "userLocation":formState.data
              
            })
            currentUser.save().then(()=>{
              console.log("saving............................")
            })
            console.log(obj);
          });
         
          formState.loader = true;
        });
      }
      }
 
    };
    // setInterval(updateLocation, 5000);

    const startLocation = async() => {
      
      formState.flag=false
      console.log("hi")
      // setTimeout(updateLocation, 1000);
      currentUser.set({
        'state':true
      })

      await currentUser.save()
    var intervel =   window.setInterval(() => {
      
      console.log(".......")
      
        if(formState.flag){
      console.log(",,,,,,,,,,,,,,")
      formState.start=true
      formState.stop=false
          

          window.clearInterval(intervel)
        }
        else{
      console.log("!!!!!!!!!!!!!!!!")
      formState.start=false
      formState.stop=true

        getLocation();
        }
        // navigator.geolocation.getCurrentPosition(() => {});
      }, 3000); 
      // clearInterval(startLocation());
    };
    const stopLocation = async()=>{
      // formState.stop=false
      currentUser.set({
        'state':false
      })

      await currentUser.save()

      console.log("stop")

      // clearInterval(startLocation());

    
      formState.flag=true

      // formState.start=true
     
      // clearInterval(myInterval);

    }

    return {
      center,
      formState,
      updateLocation,
      startLocation,
      getLocation,
      line,
      stopLocation
    };
  }
});
</script>
