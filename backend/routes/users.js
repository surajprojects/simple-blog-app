const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../middlewares/auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
        });
        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ username: username });

        if (!userData) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const passwordCheck = await bcrypt.compare(password, userData.password);

        if (passwordCheck) {
            const token = jwt.sign({
                id: userData._id,
                isAdmin: "false",
                username: userData.username,
                email: userData.email,
                fullname: userData.fullname,
                iat: Math.floor(Date.now() / 1000)
            },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });

            res.status(200).json({ message: "Login successful!" });
        }
        else {
            res.status(401).json({ message: "Invalid credentials!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const newUser = new User({ fullname, username, email });
        const salt = await bcrypt.genSalt(14);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;
        await newUser.save();

        const userData = await User.findOne({ username: newUser.username });

        const token = jwt.sign({
            id: userData._id,
            isAdmin: "false",
            username: userData.username,
            email: userData.email,
            fullname: userData.fullname,
            iat: Math.floor(Date.now() / 1000)
        },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        const errorData = Object.keys(error.errorResponse.keyValue)
        if (errorData[0] === "username") {
            res.status(409).json({ message: "Username already exists!" });
        }
        else if (errorData[0] === "email") {
            res.status(409).json({ message: "Email already exists!" });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

module.exports = router;