import express from 'express';
import { bookVisit, createUser, getAllbookings } from '../controllers/userCntrl.js';

const router = express.Router();

router.post ("/register", createUser)
router.post ("/bookVisit/:id", bookVisit)
router.post ("/allBookings", getAllbookings)

export {router as userRoute};