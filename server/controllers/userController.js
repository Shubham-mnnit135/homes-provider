import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";


// function to book a visit to resd its mine ****realstate****
export const bookVisit = asyncHandler(async (req, res) => {
  const date = req.body.date;
  const email = req.body.user.email;
  const { id } = req.params;
  
  try {
    const alreadyBooked = await prisma.residency.findUnique({
      where: { id: id },
      select: { bookDate: true },
    });

    if (alreadyBooked.bookDate.some((visit) => visit.date === date)) {
      return res.send({
        error:"property is already booked at this date"
      })
      
    } else {
      await prisma.residency.update({
        where: { id },
        data: {
          bookDate: { push: { date } },
        },
      });
      
      const user = await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });

      const userInfo = {
        name: user.name,
        email: user.email,
        id: user.id,
        image: user.image,
        bookedVisits: user.bookedVisits,
        favResidenciesID: user.favResidenciesID,
      };

      return res.send({
        user:userInfo,
        message: "booking successfull",
      });
    }
    
  } catch (err) {
    res.send({
      error: "something went wrong",
    });
    throw new Error(err.message);
  }
});


// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});


// function to cancel the booking
// export const cancelBooking = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: email },
//       select: { bookedVisits: true },
//     });

//     const index = user.bookedVisits.findIndex((visit) => visit.id === id);

//     if (index === -1) {
//       res.status(404).json({ message: "Booking not found" });
//     } else {
//       user.bookedVisits.splice(index, 1);
//       await prisma.user.update({
//         where: { email },
//         data: {
//           bookedVisits: user.bookedVisits,
//         },
//       });

//       res.send("Booking cancelled successfully");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// function to cancel the booking its mine
export const cancelBooking = asyncHandler(async (req, res) => {
  const date = req.body.date;
  const email = req.body.user.email;
  const { id } = req.params;
  try {
    const bookingDates = await prisma.residency.findUnique({
      where: { id },
      select: { bookDate: true },
    });

    const indexofDate = bookingDates.bookDate.findIndex((visit) => visit.date === date );

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id && visit.date === date);

    if (indexofDate === -1 || index === -1) {
      res.send({
        error:"booking does not exists"
      })
    }
    else
    {
      bookingDates.bookDate.splice(indexofDate, 1);
      await prisma.residency.update({
        where: { id },
        data: {
          bookDate: bookingDates.bookDate,
        },
      });

      user.bookedVisits.splice(index, 1);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      const userInfo = {
        name: updatedUser.name,
        email: updatedUser.email,
        id: updatedUser.id,
        image: updatedUser.image,
        bookedVisits: updatedUser.bookedVisits,
        favResidenciesID: updatedUser.favResidenciesID,
      };
      res.send({ message: "Successfully Cancel", user: userInfo });
    }
  } catch (err) {
    res.send({
      error:"something went Wrong"
    })
    throw new Error(err.message);
  }
});

// update the favorite List

export const updateFavList = asyncHandler(async (req, res) => {
  const email = req.body.user.email;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      const userInfo = {
        name: updateUser.name,
        email: updateUser.email,
        id: updateUser.id,
        image: updateUser.image,
        bookedVisits: updateUser.bookedVisits,
        favResidenciesID: updateUser.favResidenciesID,
      };
      res.send({ message: "Removed from favourite List", user: userInfo });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      const userInfo = {
        name: updateUser.name,
        email: updateUser.email,
        id: updateUser.id,
        image: updateUser.image,
        bookedVisits: updateUser.bookedVisits,
        favResidenciesID: updateUser.favResidenciesID,
      };
      res.send({
        message: "Successfully added to the favourite list",
        user: userInfo,
      });
    }
  } catch (err) {
    res.send({
      error:'Something went wrong'
    })
    throw new Error(err.message);
  }
});

// list of all favorite list
export const favList = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const list = await prisma.user.findUnique({
      where: { email },
      select: {
        favResidenciesID: true,
      },
    });

    res.status(200).send(list);
  } catch (err) {
    throw new Error(err.message);
  }
});
