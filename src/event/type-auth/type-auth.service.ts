import { Injectable } from '@nestjs/common';
import { EventType } from '../event.entity';
import { EventService } from '../event.service';
import * as geoIp from 'geoip-lite';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import authApiConfig from './auth-api.config';
import appConfig from '../../app.config';

@Injectable()
export class TypeAuthService {
  private readonly PROTECTED_EVENT_TYPES = ['add'];
  private readonly ADS_ALLOWED_VALUE = 'sure, why not!';

  constructor(
    private readonly eventService: EventService,
    private readonly httpService: HttpService,
  ) {}

  async isProtectedType(
    eventType: EventType,
    eventId: number,
  ): Promise<boolean> {
    return (
      this.PROTECTED_EVENT_TYPES.includes(eventType) ||
      (eventId &&
        this.PROTECTED_EVENT_TYPES.includes(
          (await this.eventService.findOne(eventId)).type,
        ))
    );
  }

  async isIpAuthorized(ip: string): Promise<boolean> {
    // mock real ip if developing
    if (appConfig.nodeEnv !== 'PROD' && ip === '::1') {
      ip = '2001:4860:4860::8888';
    }

    const geo = geoIp.lookup(ip);

    if (!geo) {
      return false;
    }

    const request = this.httpService.get(authApiConfig.url, {
      auth: {
        username: authApiConfig.username,
        password: authApiConfig.password,
      },
      params: {
        countryCode: geo.country,
      },
    });

    const response = await firstValueFrom(request);

    return (
      response.status === 200 && response.data.ads === this.ADS_ALLOWED_VALUE
    );
  }
}
