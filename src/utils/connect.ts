import mongoose from 'mongoose'
import colors from 'colors'
import config from 'config'
import logger from "./logger";


const dbUri = config.get<string>('dbUri');

 const connect = async () => {

    try {
        const connect = await mongoose.connect(dbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        })

        logger.info(`MongoDb  connected ${connect.connection.host}`)
    } catch (error) {
        logger.error(error)
        logger.error(`could not connect to database`)
        process.exit(1)
    }


}


export default connect;