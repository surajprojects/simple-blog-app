const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");

const dbUrl = "mongodb://127.0.0.1:27017/tiger-blog";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("DATABASE CONNECTED!!!");
    })
    .catch(err => {
        console.log("DATABASE CONNECTION ERROR!!!!");
        console.log(err);
    });

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);

app.all("*", async (req, res) => {
    res.status(400).json({ message: "Bad Request" });
});

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000!!!")
});