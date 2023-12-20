import { config } from 'dotenv';
import { ENV_PATH } from '../../app.config';

config({ path: ENV_PATH });

const authApiConfig = {
  url: process.env.AUTH_API_URL,
  password: process.env.AUTH_API_PASSWORD,
  username: process.env.AUTH_API_USERNAME,
};

export default authApiConfig;
