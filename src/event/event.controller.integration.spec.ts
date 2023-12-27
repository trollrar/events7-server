import { mockEvent1 } from '../../test/mock.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { Event } from './event.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ViewEventDto } from './dto/view-detailed-event';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventValidationService } from './event-validation/event-validation.service';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { UpdateEventDto } from './dto/update-event.dto';

// jest.mock('nestjs-paginate', () => ({
//   paginate: jest.fn().mockResolvedValue(mockEventsPage),
//   FilterOperator: {},
// }));

describe('EventController integration', () => {
  let app: INestApplication;
  let eventRepository: Repository<Event>;
  let eventValidationService: EventValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    eventRepository = module.get(getRepositoryToken(Event));
    eventValidationService = module.get<EventValidationService>(
      EventValidationService,
    );

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  // describe('findAll', () => {
  //   it('should return paginated events', async () => {
  //     const response = await request(app.getHttpServer()).get('/');
  //
  //     expect(response.status).toBe(200);
  //     expect(JSON.parse(response.text)).toEqual(
  //       plainToInstance(Paginated<ViewEventSummaryDto>, {
  //         ...mockEventsPage,
  //         data: plainToInstance(ViewEventSummaryDto, mockEventsPage.data),
  //       }),
  //     );
  //   });
  // });

  describe('/:id (GET)', () => {
    it('should return event', async () => {
      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(mockEvent1);
      const response = await request(app.getHttpServer()).get('/1');

      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toEqual(
        plainToInstance(ViewEventDto, mockEvent1),
      );
    });
  });

  describe('/ (POST)', () => {
    it('should create and return event', async () => {
      jest.spyOn(eventRepository, 'save').mockResolvedValue(mockEvent1);
      jest
        .spyOn(eventValidationService, 'isIpAuthorized')
        .mockResolvedValue(true);
      const response = await request(app.getHttpServer())
        .post('/')
        .send(plainToInstance(CreateEventDto, mockEvent1));

      expect(response.status).toBe(201);
      expect(JSON.parse(response.text)).toEqual(
        plainToInstance(ViewEventDto, mockEvent1),
      );
    });
  });

  describe('/:id (PATCH)', () => {
    it('should update and return event', async () => {
      jest
        .spyOn(eventRepository, 'update')
        .mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(mockEvent1);
      jest
        .spyOn(eventValidationService, 'isIpAuthorized')
        .mockResolvedValue(true);
      const response = await request(app.getHttpServer())
        .patch('/1')
        .send(plainToInstance(UpdateEventDto, mockEvent1));

      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toEqual(
        plainToInstance(ViewEventDto, mockEvent1),
      );
    });
  });

  describe('/:id (DELETE)', () => {
    it('should remove event and return true', async () => {
      jest
        .spyOn(eventRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(mockEvent1);
      jest
        .spyOn(eventValidationService, 'isIpAuthorized')
        .mockResolvedValue(true);
      const response = await request(app.getHttpServer())
        .delete('/1')
        .send(plainToInstance(UpdateEventDto, mockEvent1));

      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toEqual(true);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
