import { mockEvent1, mockEventsPage } from '../../test/mock.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from '../database/typeorm.config';
import { HttpModule } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginateQuery } from 'nestjs-paginate';

jest.mock('nestjs-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(mockEventsPage),
  FilterOperator: {},
}));

describe('EventService', () => {
  let eventRepository: Repository<Event>;
  let eventService: EventService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([Event]),
        HttpModule,
      ],
      providers: [EventService, Repository<Event>],
    }).compile();

    eventService = app.get<EventService>(EventService);
    eventRepository = app.get(getRepositoryToken(Event));
  });

  describe('findAll', () => {
    it('should return paginated events', async () => {
      const result = await eventService.findAll({} as PaginateQuery);

      expect(result).toEqual(mockEventsPage);
    });
  });

  describe('findOne', () => {
    it('should only return event if it exist', async () => {
      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(mockEvent1);
      let result = await eventService.findOne(1);

      expect(result).toEqual(mockEvent1);

      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(null);
      result = await eventService.findOne(1);

      expect(result).toEqual(null);
    });
  });

  describe('create', () => {
    it('should return event', async () => {
      jest.spyOn(eventRepository, 'save').mockResolvedValue(mockEvent1);
      const result = await eventService.create(mockEvent1 as CreateEventDto);

      expect(result).toEqual(mockEvent1);
    });
  });

  describe('update', () => {
    it('should only return event if it was updated', async () => {
      jest
        .spyOn(eventRepository, 'update')
        .mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(mockEvent1);
      let result = await eventService.update(1, mockEvent1 as UpdateEventDto);

      expect(result).toEqual(mockEvent1);

      jest
        .spyOn(eventRepository, 'update')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      result = await eventService.update(3, mockEvent1 as UpdateEventDto);

      expect(result).toEqual(null);
    });
  });

  describe('remove', () => {
    it('should only return true if event is deleted', async () => {
      jest
        .spyOn(eventRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as UpdateResult);
      let result = await eventService.remove(1);

      expect(result).toEqual(true);

      jest
        .spyOn(eventRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      result = await eventService.remove(3);

      expect(result).toEqual(false);
    });
  });
});
