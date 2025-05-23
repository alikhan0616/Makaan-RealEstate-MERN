import bcryptjs from 'bcryptjs';
import User from '../Models/user.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User saved successfully');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not Found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid user credentials!'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        res.cookie('access_token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            expires: expiryDate,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: '/',
        });


        res.status(200).json(rest);
    } catch (error) {
        console.error('Signin error:', error);
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            
            const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
            res.cookie('access_token', token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                expires: expiryDate,
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                path: '/',
            });
            res.status(200).json(rest);
        } else {
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPass, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
            res.cookie('access_token', token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                expires: expiryDate,
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                path: '/',
            });
            res.status(200).json(rest);
        }
    } catch (error) {
        console.error('Google auth error:', error);
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("Account signed out successfully!");
    } catch (error) {
        next(error);
    }
};