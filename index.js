const express = require('express'); 
const app = express();
const port = 3000;
const authTokenMiddleware = require('./middleware/authToken');
app.use(express.json());

const itemRoutes = require("./routers/itemRoutes")
app.use("/item",authTokenMiddleware,itemRoutes)

const userRoutes = require("./routers/userRoutes")
app.use("/user",userRoutes)


app.listen({port} ,()=>{
    console.log("server listening at port " + port);
})