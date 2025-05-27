import { Router } from "express";
import { User } from "../db.js";
import bcrypt from "bcrypt";
import zod from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import authMiddleware from "../middleware.js";

const router = Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isExist = await User.findOne({ username });

    if (isExist) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      password: hashedPassword,
      username,
      lastName,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.status(201).json({
      message: "Signup Successfully, User is Created !!",
      userId: user._id,
      username: user.username,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "Incorrect Inputs!!",
      });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Incorrect Password!!",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "signin successfully!!",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occur in signin route",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  return res.json({
    message: "Updated Successfully"
  })

});

router.get("/bulk", async(req, res)=> {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          "$regex": filter
        }
      },{
        lastName: {
          "$regex": filter
        }
      }
    ]
  });

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });

});


export default router;
