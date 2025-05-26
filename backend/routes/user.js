import { Router } from "express";
import User from "../db";
import bcrypt from "bcrypt"

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const {username, password, firstName, lastName} = req.body;

    if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({
        message: "All fields are required"
    });
  }

    const isExist = await User.findOne({username});

    if(isExist){
        return res.status(409).json({
            message: "User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user =  await User.create({
        firstName,
        password: hashedPassword,
        username,
        lastName
    });

    return res.status(201).json({
        message: "Signup Successfully !!",
        userId: user._id,
        username: user.username
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

});




export default router;
