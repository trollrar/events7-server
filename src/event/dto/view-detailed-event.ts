import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ViewDetailedEventDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly priority: number;
}
