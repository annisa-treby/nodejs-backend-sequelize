const bunyan = require('bunyan');
const dotenv = require('dotenv');
const {TYPE_INFO, TYPE_FATAL, TYPE_ERROR} = require('./constant/log-type.constant')

dotenv.config();
const logConfig = bunyan.createLogger({
    name: process.env.APP_NAME,
    level:process.env.LOG_LEVEL,
    streams: [
        {
            stream: process.stdout
        },
        {
            type: 'rotating-file',
            level: 'error',
            period: '1d',
            count: 3,
            path: process.env.LOG_PATH
        }
    ]
});

const recordLog = (logInfo) => {
    switch (logInfo.logType) {
        case TYPE_FATAL:
            logConfig.fatal(logInfo.logTitle, logInfo.logMessage)
            break;

        case TYPE_ERROR :
            logConfig.error(logInfo.logTitle, logInfo.logMessage)
            break;

        case TYPE_INFO :
            logConfig.info(logInfo.logTitle, logInfo.logMessage)
            break;

        default:
            logConfig.debug(logInfo.logTitle, logInfo.logMessage)
    }
}

module.exports = recordLog;