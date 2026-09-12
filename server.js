require('dotenv').config();
const app=require('./src/app');
const pool=require('./src/config/db');

pool.query("SELECT NOW()");

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

