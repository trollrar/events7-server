import { Exclude, Expose } from 'class-transformer';
import { ViewEventSummaryDto } from './view-event-summary.dto';

@Exclude()
export class ViewEventDto extends ViewEventSummaryDto {
  @Expose()
  readonly description: string;
}
