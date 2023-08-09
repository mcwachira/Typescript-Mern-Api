
import pino from 'pino'
import dayjs from "dayjs";
import pretty from "pino-pretty";


const stream = pretty({
    colorize: true
})
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },

    base:{
        pid:false,
    },
    timestamp:() => `,"time":"${dayjs().format()}`
})

export default logger