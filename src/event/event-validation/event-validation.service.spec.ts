import { mockEvent1, mockEvent2 } from '../../../test/mock.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event.service';
import { Event, EventType } from '../event.entity';
import dataSourceOptions from '../../database/typeorm.config';
import { EventValidationService } from './event-validation.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { AxiosResponse } from 'axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { of } from 'rxjs';

describe('EventValidationService', () => {
  let eventService: EventService;
  let httpService: HttpService;
  let eventValidationService: EventValidationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([Event]),
        HttpModule,
      ],
      providers: [EventService, EventValidationService, Repository<Event>],
    }).compile();

    eventService = app.get<EventService>(EventService);
    eventValidationService = app.get<EventValidationService>(
      EventValidationService,
    );
    httpService = app.get<HttpService>(HttpService);
  });

  describe('isProtectedType', () => {
    it('should only return true if type is ads or fetched event is of type ads', async () => {
      jest.spyOn(eventService, 'findOne').mockResolvedValue(mockEvent1);

      let result = await eventValidationService.isProtectedType(
        EventType.ADS,
        1,
      );
      expect(result).toEqual(true);

      result = await eventValidationService.isProtectedType(EventType.APP, 1);
      expect(result).toEqual(true);

      jest.spyOn(eventService, 'findOne').mockResolvedValue(mockEvent2);
      result = await eventValidationService.isProtectedType(EventType.APP, 2);
      expect(result).toEqual(false);
    });
  });

  describe('isIpAuthorized', () => {
    it('should only return true if api responds with "sure, why not!"', async () => {
      const testIp = '2001:4860:4860::8888';

      let apiResult = {
        status: 200,
        data: { ads: 'sure, why not!' },
      } as AxiosResponse;
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResult));

      let result = await eventValidationService.isIpAuthorized(testIp);
      expect(result).toEqual(true);

      apiResult = {
        status: 200,
        data: { ads: 'You shall not pass!' },
      } as AxiosResponse;
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResult));

      result = await eventValidationService.isIpAuthorized(testIp);
      expect(result).toEqual(false);

      apiResult = {
        status: 500,
      } as AxiosResponse;
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResult));

      result = await eventValidationService.isIpAuthorized(testIp);
      expect(result).toEqual(false);
    });
  });
});
