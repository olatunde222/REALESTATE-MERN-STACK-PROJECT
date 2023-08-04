import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating user");

  let { email } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "user created successfully",
      user: user,
    });
  } else res.status(201).send({ message: "user already registered" });
});

// function to book a residency visit

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "you have already booked this visit" });
      
    } 
    else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit has been booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all bookings of a user

export const getAllbookings = asyncHandler (async (req, res) => {
  const {email} = req.body
  try{
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    })
    res.status(200).send(bookings)

  }catch(err){
    throw new Error(err.message)
  }
})
