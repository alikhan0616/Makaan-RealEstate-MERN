import express from 'express'

const router = express.Router();

router.get("/test" , (req, res) => {
    res.json({message: "The Api is working fine!"})
})

export default router;