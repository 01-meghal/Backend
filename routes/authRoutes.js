const express = require("express")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")//password hashing


const router = express.Router()

router.post("/signup",async(req , res) => {
    try{
        const {name,phone,email,password} = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({
                message: "Name , email , phone number and password is required" 
            })
        }
        // existing user logic:
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(409).json({
                message: "User is already registered , please login!"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        //new user ko save karna hai database main :
        const newUser = await User({
            name,
            phone,
            email,
            password: hashedPassword,
        })
        await newUser.save();
         return res.status(201).json({
            message: "User registered successfully",
        })
    } catch (error) {
        console.log("Signup Error:", error)
        return res.status(500).json({
            message: "server side error",
        })
    }
    
});


router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required",
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password); // fix: user.password, not User.password

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid phone number or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server side error",
    });
  }
});

module.exports = router;