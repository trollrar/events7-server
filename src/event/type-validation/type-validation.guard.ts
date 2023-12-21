import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { TypeValidationService } from './type-validation.service';

@Injectable()
export class TypeValidationGuard implements CanActivate {
  constructor(private readonly typeAuthService: TypeValidationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      !(await this.typeAuthService.isProtectedType(
        request.body.type,
        request.params.id,
      ))
    ) {
      return true;
    }

    if (!(await this.typeAuthService.isIpAuthorized(request.ip))) {
      throw new ForbiddenException(
        'Creating or editing events where type="add" is not allowed in your country',
      );
    }

    return true;
  }
}
