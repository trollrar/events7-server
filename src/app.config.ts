import { config } from 'dotenv';
import { join } from 'path';
import * as process from 'process';

export const ENV_PATH = join(
  __dirname,
  '..',
  process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
);

config({ path: ENV_PATH });
const appConfig = {
  nodeEnv: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN,
};

export default appConfig;
