require('dotenv').config();

import { App } from "./App";
import { DbConnection } from "./dataAccess/MongoSetting";


//Connection string .env olmadığı sürece hata verecek
new DbConnection();


App.listen(process.env.PORT,() => {
    console.log(process.env.RUNMESSAGE)
});