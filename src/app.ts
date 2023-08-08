import express from 'express'
import config from 'config'
import connect from "./utils/connect";
import logger from "./utils/logger";
import dotenv from "dotenv"

dotenv.config()



const port = config.get<number>("port")

console.log(port)

const app = express()

app.listen(port, async () => {
    logger.info(`app running on port ${port}`)
    await connect()
})