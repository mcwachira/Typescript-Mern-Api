import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
	prtetyPrint: true,
	base: {
		pid: false, //process id,
	},
	timestamp: () => `,"time" ${dayjs().format}`,
});

export default log;
