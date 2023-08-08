import jwt, {Secret} from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import config from 'config'

const privateKey = config.get("accessTokenPrivateKey");
 //console.log(privateKey)
const publicKey = config.get("accessTokenPublicKey");
 console.log(publicKey)

//
// export const signJwt = (object:Object, options?:jwt.SignOptions | undefined) => {
// return jwt.sign(object, <Secret>privateKey, {
// ...(options && options),
//         algorithm: "RS256",
//     });
// }
//
//
// export const verifyJwt = (token:string) => {
//     try {
//         const decoded = jwt.verify(token, publicKey);
//         return {
//             valid: true,
//             expired: false,
//             decoded,
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             valid: false,
//             expired: e.message === "jwt expired",
//             decoded: null,
//         };
//     }
// }

const generateToken = (res:Response, userId:string) => {
    const token = jwt.sign({userId},  <Secret>privateKey,{
        expiresIn:'30d'
    });

    res.cookie('jwt', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    })
}

export default generateToken