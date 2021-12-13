//"test": "node --tls-max-v1.3 --tls-cipher-list=TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256 main/launch.js"

const express = require('express');
const app = express();
const mongoose =require ('mongoose')
const dotenv =require('dotenv')


// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();
//connect to database
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser : true},
    () => console.log("connected to database!!!!!!!!!!!")
)

//Middleware
app.use(express.json());


//Route Middle ware
app.use('/api/user', authRoute);

app.listen(3000, ()=> console.log('up and running'));