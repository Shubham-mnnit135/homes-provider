import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { comparePassword, hashPassword } from "../helper/helper.js";
import jwt from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (user) {
      const match = await comparePassword(password, user.password);
      if (match) {
        const userInfo = {
          name: user.name,
          email: user.email,
          id: user.id,
          image: user.image,
          bookedVisits: user.bookedVisits,
          favResidenciesID: user.favResidenciesID,
        };
        // jwt.sign(userInfo,process.env.JWT_SECRET_KEY,{},(err,token) =>{
        //      if(err)
        //        throw err;
        //     console.log("token : ",token)
        //     console.log("user inf ; " , userInfo);
        //     res.cookie("token",token,{ expires: new Date((new Date()).getTime() + (10 * 86400000)),httpOnly: true }).json(userInfo);
        // });
        jwt.sign({name:user.name,email:user.email,id:user.id},process.env.JWT_SECRET_KEY,{}, async (err,token) =>{
             if(err)
               throw err;
            
            const hashedToken = await hashPassword(token);
            res.send({
                message:`Welcome ❤️${userInfo.name}`,
                token:hashedToken,
                user:userInfo
            });
        });
        //  const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY);
        
      } else {
        res.send({
          error: "Wrong password",
        });
      }
    } else {
      res.send({
        error: "Email does not exists",
      });
    }
  } catch (error) {
    res.send({
      error: "Something Went Wrong",
    });
    throw error;
  }
});
