require('dotenv').config();

import { App } from "./App";



App.listen(process.env.PORT,() => {
    console.log(process.env.RUNMESSAGE)
});