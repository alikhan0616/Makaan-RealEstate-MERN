import express from 'express'
import {VerifyToken} from '../utils/VerifyToken.js'
import { createListing, deleteListing } from '../controller/listing.controller.js';

const router = express.Router();

router.post('/create' , createListing)

router.delete('/delete/:id', VerifyToken, deleteListing)

export default router;