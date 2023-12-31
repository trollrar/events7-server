import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { ENV_PATH } from '../app.config';

config({ path: ENV_PATH });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
};

export default dataSourceOptions;
