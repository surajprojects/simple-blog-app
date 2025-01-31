const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");

const dbUrl = "mongodb+srv://suraj23082002:J9tQ2OK3AJYeUtUw@cluster0.v2efp.mongodb.net/";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("DATABASE CONNECTED!!!");
    })
    .catch(err => {
        console.log("DATABASE CONNECTION ERROR!!!!");
        console.log(err);
    });

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://simple-blog-app-peach.vercel.app",
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