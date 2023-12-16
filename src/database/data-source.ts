import { DataSource } from 'typeorm';
import dataSourceOptions from './typeorm.config';

/**
 * This DataSource is only used for typeorm commands.
 * To use DataSource in nestjs inject it.
 **/
export default new DataSource(dataSourceOptions);
