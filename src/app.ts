import express from 'express'
import config from 'config'
import connect from "./utils/connect";
import logger from "./utils/logger";



const port = config.get<number>("port")

console.log('this port', port)
const app = express()

app.listen(port, async () => {
    logger.info(`app running on port ${port}`)
    await connect()
})