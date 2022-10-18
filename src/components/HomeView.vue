

<template>
  <div>
    <!-- <p>{{formState.getData}}</p> -->
    <button @click="stopLocation()">STOP</button>
    <userView />
    <!-- <button @click="getLocation()">Track Location</button> -->
    
    <GoogleMap
      v-if="formState.loader"
      api-key="AIzaSyABPywZVGnAsgP8llgiBFnx8sAvUUiRyv4"
      style="width: 100%; height: 500px"
      :center="formState.center"
      :zoom="25"
    >
      <Polyline :options="line.flightPath" />
      <Marker :options="{ position: formState.center }" />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { GoogleMap, Marker, Polyline } from "vue3-google-map";

import Parse from "parse";
import User from "../server/user";
import userView from "../components/UserView.vue";
// import Parse from "parse";

export default defineComponent({
  components: { GoogleMap, Marker, Polyline, userView },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    const formState = reactive({
      image: "",
      center: { lat: 40.689247, lng: -74.044502 },
      loader: false,
      data: [],
      getData:[]
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
    const stopLocation = ()=>{
      console.log("stop")
      clearInterval(getLocation());

    }
    onMounted(async () => {
      // const currentUser = Parse.User.current();
      getLocation();


     
      window.setInterval(() => {
        navigator.geolocation.getCurrentPosition(() => {});
        getLocation();
      }, 9000); //number of milliseconds
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
          
          const currentUser = Parse.User.current();
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

    const trackLocation = () => {
      // console.log("hi")
      // setTimeout(updateLocation, 1000);
    };

    return {
      center,
      formState,
      updateLocation,
      trackLocation,
      getLocation,
      line,
      stopLocation
    };
  }
});
</script>
