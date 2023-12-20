import { Module } from '@nestjs/common';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeAuthService } from './type-auth/type-auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), HttpModule],
  controllers: [EventController],
  providers: [EventService, TypeAuthService],
})
export class EventModule {}
