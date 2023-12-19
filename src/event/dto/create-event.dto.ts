import { IsEnum, IsInt, Length, Max, Min } from 'class-validator';
import { EventType } from '../event.entity';

export class CreateEventDto {
  @Length(2, 48)
  readonly name: string;

  readonly description: string;

  @IsEnum(EventType)
  readonly type: string;

  @IsInt()
  @Min(0)
  @Max(10)
  readonly priority: number;
}
