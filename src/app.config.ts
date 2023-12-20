import { config } from 'dotenv';
import { join } from 'path';

export const ENV_PATH = join(
  __dirname,
  '..',
  process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
);

config({ path: ENV_PATH });
const appConfig = {
  nodeEnv: process.env.NODE_ENV,
};

export default appConfig;
