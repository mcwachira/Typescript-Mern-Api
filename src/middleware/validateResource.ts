import express, {Request, Response, NextFunction} from "express";
import {AnyZodObject} from 'zod'


//curring ??- function that returns another function
const validate = (schema:AnyZodObject) => (req:Request, res:Response, next:NextFunction) => {


    try{
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        });
        next()
    }catch(e:any){

        return res.status(400).send(e.error)
    }
}


export default validate