import express from 'express'
import { test, updateUser } from '../controller/user.controller.js';
import { VerifyToken } from '../utils/VerifyToken.js'
const router = express.Router()

router.get("/test" , test)

router.post('/update/:id', VerifyToken, updateUser)

export default router;