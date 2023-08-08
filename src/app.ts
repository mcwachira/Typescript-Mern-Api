import express from 'express'
import config from 'config'
import connect from "./utils/connect";
import logger from "./utils/logger";
import dotenv from "dotenv"
import routes from "./routes";

dotenv.config()



const port = config.get<number>("port")

console.log(port)

const app = express()


// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded /form data
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.listen(port, async () => {
    logger.info(`app running on port ${port}`)
    await connect()
    routes(app)

})