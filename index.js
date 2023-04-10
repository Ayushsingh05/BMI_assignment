
const cors = require('cors');
const express = require('express');
const connect = require('./config/dbConnect');
const userRoute = require('./Routes/userRoutes');;
const app =express();
const port =8080;
app.use(cors());
app.use(express.json());

app.use('/users',userRoute);

 app.get('/',(req,res)=>{
    res.send("Server is Live ")
 })
connect()
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})
