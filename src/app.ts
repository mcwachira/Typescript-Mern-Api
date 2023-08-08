import express from 'express'
import config from 'config'
import connect from "./utils/connect";
import logger from "./utils/logger";
import dotenv from "dotenv"
import routes from "./routes";

import {pinoHttp} from "pino-http";
import {errorHandler, notFound} from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

dotenv.config()



const port = config.get<number>("port")

console.log(port)

const app = express()

app.use(
    pinoHttp({
        logger,
    })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get cookies
app.use(cookieParser())


//app.use(notFound);
app.use(errorHandler);
app.listen(port, async () => {
    logger.info(`app running on port ${port}`)
    await connect()
    routes(app)

})