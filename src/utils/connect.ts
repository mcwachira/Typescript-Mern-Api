import mongoose from 'mongoose'
import colors from 'colors'
import config from 'config'


 const connect = async () => {

    const dbUri = config.get<string>('dbUri');

    try {
        const connect = await mongoose.connect(dbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
           j
        })

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.messages}`.red.underline.bold)
        process.exit(1)
    }


}


export default connect;