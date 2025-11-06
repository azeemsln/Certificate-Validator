import express from "express"
import { getDetails } from "../controllers/User.js";
const router = express.Router();


router.get("/getdetails/:certificateNumber", getDetails);

export default router;