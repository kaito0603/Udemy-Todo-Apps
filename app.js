const express = require("express");
const app = express();
const axios = require("axios");
const axi = axios();
const PORT = 5000;
const taskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));


app.use("/api/v1/tasks",taskRouter);

//DBと接続
const start = async () => {
    try {
       await connectDB(process.env.MONGO_URL);
    }catch (err){
        console.log(err);
    }
}

start();
app.listen(PORT, console.log("サーバーが起動しました。"));
