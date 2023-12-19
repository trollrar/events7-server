import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Event>> {
    return await this.eventService.findAll(query);
  }
}
