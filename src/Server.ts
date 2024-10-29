import { App } from "./App";
require('dotenv').config();

App.set("PORT",process.env.PORT)
App.listen(App.get("PORT"),()=>{console.log("The server started , Port is : " + App.get("PORT") );});