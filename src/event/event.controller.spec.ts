import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from '../database/typeorm.config';

describe('AppController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([Event]),
      ],
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    eventController = app.get<EventController>(EventController);
    eventService = app.get<EventService>(EventService);
  });

  describe('getEvents', () => {
    it('should return Event[]', async () => {
      const mockEvent = [
        {
          id: 1,
          name: 'test',
          description: 'test description',
          type: 'add',
          priority: 0,
        },
      ];
      jest.spyOn(eventService, 'findAll').mockResolvedValue(mockEvent);
      const result = await eventController.getEvents();

      expect(result).toEqual(mockEvent);
    });
  });
});
