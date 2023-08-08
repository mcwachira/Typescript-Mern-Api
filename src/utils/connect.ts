import mongoose from 'mongoose'
import colors from 'colors'
import config from 'config'


const dbUri = config.get<string>('dbUri');

 const connect = async () => {

    try {
        const connect = await mongoose.connect(dbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        })

        console.log(`MongoDb  connected ${connect.connection.host}`.underline.blue)
    } catch (error) {
        console.log(error)
        console.log(`could not connect to database`.underline.red.bold)
        process.exit(1)
    }


}


export default connect;