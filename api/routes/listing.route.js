import express from 'express'
import {VerifyToken} from '../utils/VerifyToken.js'
import { createListing, deleteListing, getListing, updateListing } from '../controller/listing.controller.js';

const router = express.Router();

router.post('/create' , createListing)

router.delete('/delete/:id', VerifyToken, deleteListing)

router.post('/update/:id', VerifyToken, updateListing)

router.get('/get/:id', getListing)

export default router;