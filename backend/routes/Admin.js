import express from "express"
import { addUser, getAllUser, login, logout } from "../controllers/Admin.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();


// router.post("/signup", signup);
router.post("/login", login);
router.post("/adduser", addUser);
router.post("/logout",auth, logout);
router.get("/getalluser", getAllUser);


export default router;