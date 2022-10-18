import { createApp } from "vue";
import App from "./App.vue";
import Parse from "parse";

Parse.initialize(
  "3kUoLhExL7MvQZPpeQOzeWX8lBRg9ByH2MX98NV3",
  "Gpe0OuRxCPNiD1MYDkoDIDVDOyBSimVp9esnQTIY"
); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.masterKey = "1JfPZjCAtQhYCB9WdoorUzdfbyllqM1nZfGFD26u";

createApp(App).mount("#app");
