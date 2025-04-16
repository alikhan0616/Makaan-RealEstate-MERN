import express from 'express'
import { deleteUser, getUser, test, updateUser, userListings } from '../controller/user.controller.js';
import { VerifyToken } from '../utils/VerifyToken.js'
const router = express.Router()

router.get("/test" , test)

router.post('/update/:id', VerifyToken, updateUser)

router.delete('/delete/:id', VerifyToken, deleteUser)

router.get('/listings/:id', VerifyToken, userListings)

router.get('/:id', VerifyToken, getUser)

export default router;