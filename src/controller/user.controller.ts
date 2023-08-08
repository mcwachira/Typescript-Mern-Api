import express, {Request, Response, NextFunction} from "express";
import {omit} from 'lodash'
import logger from "../utils/logger";
import {createUser} from "../service/user.service";
import {CreateUserInput} from "../schema/user.schema";
import generateToken from "../utils/jwt.utils";


//@desc Register a new user
//route POST /api/users
//@access Public
export const createUserHandler = async (req:Request<{}, {}, CreateUserInput["body"]>, res:Response) =>{

    try{

        const user = await createUser(req.body)

        if(user){
            generateToken(res, user._id)
            res.status(201).send(omit(user.toJSON(), 'password'))
        }else{
            res.status(400)
            throw new Error('error creating user')
        }


        return
    }catch(e:any){
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

