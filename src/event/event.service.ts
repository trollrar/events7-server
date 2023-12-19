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
import { CreateEventDto } from './dto/create-event.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  findAll(query: PaginateQuery): Promise<Paginated<Event>> {
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

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventRepository.save(plainToInstance(Event, createEventDto));
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(
      id,
      plainToInstance(Event, updateEventDto),
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected === 1;
  }
}
