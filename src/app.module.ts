import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from './database/typeorm.config';
import { EventModule } from './event/event.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
