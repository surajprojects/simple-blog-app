const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";  // Store securely in environment variables

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided! Please re-login!" });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ message: "Invalid or expired token! Please re-login!" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { authenticateToken, SECRET_KEY }