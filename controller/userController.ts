import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";

const User = mongoose.model('User');

export const register = async function (req: Request, res: Response) {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
        return res.status(400).send({ "error": "Missing required field" });
    }

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).send({ "error": "An error occurred" });
    }
};

export const login = async function (req: Request, res: Response){
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ "error": "Missing email or password" });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ "error": "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ "error": "Invalid email or password" });
        }

        const token = jwt.sign({ _id: user._id, username: user.name }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: '1h'
        });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).send({ "error": "An error occurred during login" });
    }
};
