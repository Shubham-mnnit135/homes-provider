import express from "express";
import { 
    
    bookVisit,
    getAllBookings,
    cancelBooking,
    updateFavList, 
    favList
} from "../controllers/userController.js";
import  {registerUser}  from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { getProfile } from "../controllers/getProfile.js";
import { verifyToken } from "../helper/helper.js";

const router = express.Router();
router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/profile", verifyToken,getProfile)
router.post("/bookVisit/:id", verifyToken,bookVisit);
router.get("/allBookings", getAllBookings);
// router.get("/allMyResidencies", verifyToken,getAllMyResidencies);
router.post("/cancelBooking/:id", verifyToken,cancelBooking);
router.post("/updateFavList/:rid", verifyToken,updateFavList);
router.get("/favList", verifyToken,favList);

export { router as userRoute };