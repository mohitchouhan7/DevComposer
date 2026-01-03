const express = require("express");
const { authenticate } = require('./middleware/jwt');
const bodyParser = require("body-parser");
const cokieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require('./mongo/connectDb');

const authRoute = require("./routes/authRoute");

require("dotenv").config();
const port = process.env.PORT||3000;

const app = express();
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cokieParser());
app.use(express.json());
app.use(express.static("public"));


app.use("/api/auth", authRoute);
app.get('/',authenticate,(req,res)=>{
    res.status(200).json("fuck this");
})

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
