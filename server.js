const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./Config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authroute = require("./routes/authRoutes")




const app = express();
connectDB();

const allowedOrigin = ["http://localhost:5173","https://bejewelled-pavlova-a77450.netlify.app/"]

// parsing the body 
app.use(express.json())

app.use(cors({
  origin: function(origin,callback){
    if(!origin || allowedOrigin.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error ("error occurred"))
    }
  },
  methods: ["GET", "POST" , "PUT", "DELETE"],
  Credentials: true,
}))

const PORT = process.env.PORT || 7000 || 6000;

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Express login api",
  });
  console.log("Hello World");
});

app.use("/api/auth",authroute)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});