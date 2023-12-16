import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getEvents(): Promise<Event[]> {
    return await this.eventService.findAll();
  }
}
