import { Request, Response, NextFunction } from "express";

interface Error {
    stack: any;
    kind: Boolean;
    name: string;
    status?: number;
    message?: string;
}

const notFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {


    let statusCode = res.statusCode === 200 ? 500: res.statusCode
    let message = err.message;
//check for Mongoose bad ObjectId


    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? '': err.stack,

    })
}


export {
    notFound,
    errorHandler
}