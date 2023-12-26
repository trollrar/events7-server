import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from '../database/typeorm.config';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { EventValidationService } from './event-validation/event-validation.service';
import { HttpModule } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { ViewEventSummaryDto } from './dto/view-event-summary.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { ViewEventDto } from './dto/view-detailed-event';
import { mockEvent1, mockEventsPage } from '../../test/mock.constants';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;
  let eventValidationService: EventValidationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([Event]),
        HttpModule,
      ],
      controllers: [EventController],
      providers: [EventService, EventValidationService],
    }).compile();

    eventController = app.get<EventController>(EventController);
    eventService = app.get<EventService>(EventService);
    eventValidationService = app.get<EventValidationService>(
      EventValidationService,
    );
  });

  describe('findAll', () => {
    it('should return paginated eventSummaryDtos', async () => {
      jest.spyOn(eventService, 'findAll').mockResolvedValue(mockEventsPage);
      const result = await eventController.findAll({} as PaginateQuery);

      expect(result).toEqual(
        plainToInstance(Paginated<ViewEventSummaryDto>, {
          ...mockEventsPage,
          data: plainToInstance(ViewEventSummaryDto, mockEventsPage.data),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return eventDto', async () => {
      jest.spyOn(eventService, 'findOne').mockResolvedValue(mockEvent1);
      const result = await eventController.findOne(1);

      expect(result).toEqual(plainToInstance(ViewEventDto, mockEvent1));
    });
  });

  describe('create', () => {
    it('should return eventDto', async () => {
      jest.spyOn(eventService, 'create').mockResolvedValue(mockEvent1);
      const result = await eventController.create(
        plainToInstance(CreateEventDto, mockEvent1),
      );

      expect(result).toEqual(plainToInstance(ViewEventDto, mockEvent1));
    });
  });

  describe('update', () => {
    it('should return eventDto', async () => {
      jest.spyOn(eventService, 'update').mockResolvedValue(mockEvent1);
      const result = await eventController.update(
        1,
        plainToInstance(CreateEventDto, mockEvent1),
      );

      expect(result).toEqual(plainToInstance(ViewEventDto, mockEvent1));
    });
  });

  describe('remove', () => {
    it('should return true', async () => {
      jest.spyOn(eventService, 'remove').mockResolvedValue(true);
      const result = await eventController.remove(1);

      expect(result).toEqual(true);
    });
  });

  describe('isIpAuthorized', () => {
    it('should return true', async () => {
      jest
        .spyOn(eventValidationService, 'isIpAuthorized')
        .mockResolvedValue(true);
      const result = await eventController.isAuthorized('::1');

      expect(result).toEqual(true);
    });
  });
});
