
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helper/helper.js";

export const getProfile = asyncHandler(async (req, res) => {
  
  try {
    
      console.log("most welcome");
      res.send({
        message:"you have varify",
        user:req.body.user
      })
  } catch (error) {
    throw error;
  }
});
