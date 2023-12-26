import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { EventValidationService } from './event-validation.service';

@Injectable()
export class EventValidationGuard implements CanActivate {
  constructor(
    private readonly eventValidationService: EventValidationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      !(await this.eventValidationService.isProtectedType(
        request.body.type,
        request.params.id,
      ))
    ) {
      return true;
    }

    if (!(await this.eventValidationService.isIpAuthorized(request.ip))) {
      throw new ForbiddenException(
        'Creating or editing events where type="add" is not allowed in your country',
      );
    }

    return true;
  }
}
