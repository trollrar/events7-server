import { Exclude, Expose } from 'class-transformer';
import { ViewEventDto } from './view-event.dto';

@Exclude()
export class ViewDetailedEventDto extends ViewEventDto {
  @Expose()
  readonly description: string;
}
