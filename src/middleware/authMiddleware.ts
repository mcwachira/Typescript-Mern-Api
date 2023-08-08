import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User, {UserDocument} from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import config from 'config'

interface IUserRequest extends Request {
    user: any
}

const publicKey = config.get("accessTokenPublicKey");
console.log(publicKey)


// User must be authenticated
const protect = asyncHandler(async (req: IUserRequest , res:Response, next:NextFunction) => {
    let token;

    console.log(req)
    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, publicKey);

            req.user  = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// // User must be an admin
// const admin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(401);
//         throw new Error('Not authorized as an admin');
//     }
// };

export { protect };