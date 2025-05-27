import JWT_SECRET from "./config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Access token is missing or invalid format",
    });
  }

  const token = authHeader.split(" ")[1];

    if (!token) {
    return res.status(401).json({
      message: "Access token is missing",
    });
  }

  try {
    const decodeMessage = jwt.verify(token, JWT_SECRET);
    if(decodeMessage.userId){
      req.userId = decodeMessage.userId;
      next();
    }else{
      return res.status(403).json({
        message: "Invalid token payload",
      });
    }
  } catch (err) {
    return res.status(403).json({
      message: "Authorization error",
    });
  }
};

export default authMiddleware;

