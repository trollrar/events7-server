import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ViewEventDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly priority: number;
}
