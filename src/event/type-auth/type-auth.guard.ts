import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { TypeAuthService } from './type-auth.service';

@Injectable()
export class TypeAuthGuard implements CanActivate {
  constructor(private readonly typeAuthService: TypeAuthService) {}

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
