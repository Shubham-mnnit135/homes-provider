import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { hashPassword } from "../helper/helper.js";

export const registerUser = asyncHandler(async (req, res) => {

  const {name, email, password} = req.body;  
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!userExists) {
      const hashed = await hashPassword(password);
      console.log("hashed : ",hashed)
      const userDetails = {
         name : name,
         email:email,
         password:hashed
      }
      const user = await prisma.user.create({ data: userDetails });
      console.log("registered");
      res.send({
        message: `Hii Mr. ${user.name}`,
        user: user,
      });
    }
    else{
        res.send({
            error:"Email is already exists"
        })
    }
  } catch (err) {
    res.send({
        message:"something went wrong"
    })
    throw err;
  }
});

