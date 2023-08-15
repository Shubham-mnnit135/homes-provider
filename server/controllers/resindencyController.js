import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
    } = req.body.propertyDetails;
  
    
    try {
      const residency = await prisma.residency.create({
        data: {
          title,
          description,
          price,
          address,
          country,
          city,
          facilities,
          image,
          owner: { connect: { email: userEmail } },
        },
      });
      // console.log("created resi ; ", residency);
      res.send({ message: "Residency created successfully", residency });
    } catch (err) {
      if (err.code === "P2002") {
        res.send({ error: "address is not unique"});
        throw new Error("A residency with address already there");
      }
      throw new Error(err.message);
    }
  });


//   get all residencies

export const getAllResidencies = asyncHandler( async (req, res) => {
    try {
        const residencies  = await prisma.residency.findMany({
            orderBy: {
                createdAt : "desc"
            },
        });

        res.send(residencies);
    } catch (err) {
        throw new Error(err.message);
    }
});
  
export const getResidency = asyncHandler( async (req, res) => {
    const {id} = req.params;
    // console.log("getResidency on bakcend")
    // console.log(id);
    try {
        const residency  = await prisma.residency.findUnique({where:{id: id}});
        res.send(residency);
    } catch (err) {
        throw new Error(err.message);
    }
});
  