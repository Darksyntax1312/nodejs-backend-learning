// This is the second method to create a server using express module.
const express = require('express');
const app = express();

app.get('/users',(req , res)=>{
    res.send("Hii this is the first request i am sending from this server.")
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})