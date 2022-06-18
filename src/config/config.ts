require('dotenv').config();

import { parse } from 'pg-connection-string';

const config = parse(process.env.DATABASE_URL);
export const db = {
  host: config.host,
  port: +config.port,
  username: config.user,
  database: config.database,
  password: config.password,
};

export const awsSetting = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.AWS_BUCKET_NAME,
};
