import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Event>> {
    return paginate(query, this.eventRepository, {
      sortableColumns: ['id', 'name', 'type', 'priority'],
      filterableColumns: {
        type: [FilterOperator.EQ],
        priority: [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.LT,
          FilterOperator.GTE,
          FilterOperator.LTE,
        ],
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
