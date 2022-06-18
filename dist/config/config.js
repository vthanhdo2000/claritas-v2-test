"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsSetting = exports.db = void 0;
require('dotenv').config();
const pg_connection_string_1 = require("pg-connection-string");
const config = (0, pg_connection_string_1.parse)(process.env.DATABASE_URL);
exports.db = {
    host: config.host,
    port: +config.port,
    username: config.user,
    database: config.database,
    password: config.password,
};
exports.awsSetting = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
};
//# sourceMappingURL=config.js.map