const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../modals/User")
const jwt = require("jsonwebtoken");


const router = express.Router();


router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await User.create({ email, password: hashedPassword });
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});





module.exports = router;
