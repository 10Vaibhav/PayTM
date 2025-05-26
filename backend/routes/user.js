import { Router } from "express";
import User from "../db";
import bcrypt from "bcrypt"
import zod from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js"

const router = Router();

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
});

router.post("/signup", async (req, res) => {
  try {
    const {username, password, firstName, lastName} = req.body;

    const {success} = signupSchema.safeParse(req.body);

    if(!success){
      return res.json({
        message: "Incorrect inputs",
      });
    }

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

    const token = jwt.sign({
      userId: user._id
    },JWT_SECRET);

    return res.status(201).json({
        message: "Signup Successfully, User is Created !!",
        userId: user._id,
        username: user.username,
        token: token
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

});




export default router;
