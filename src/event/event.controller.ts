import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { ViewEventDto } from './dto/view-event.dto';
import { plainToInstance } from 'class-transformer';
import { ViewDetailedEventDto } from './dto/view-detailed-event';
import { TypeValidationGuard } from './type-validation/type-validation.guard';
import { TypeValidationService } from './type-validation/type-validation.service';

@Controller()
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly typeValidationService: TypeValidationService,
  ) {}

  @Get('/is-authorized')
  async isAuthorized(@Ip() ip: string): Promise<boolean> {
    return this.typeValidationService.isIpAuthorized(ip);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ViewEventDto>> {
    const events = await this.eventService.findAll(query);

    return plainToInstance(Paginated<ViewEventDto>, {
      ...events,
      data: plainToInstance(ViewEventDto, events.data),
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ViewDetailedEventDto> {
    return plainToInstance(
      ViewDetailedEventDto,
      await this.eventService.findOne(id),
    );
  }

  @Post()
  @UseGuards(TypeValidationGuard)
  async create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<ViewDetailedEventDto> {
    return plainToInstance(
      ViewDetailedEventDto,
      await this.eventService.create(createEventDto),
    );
  }

  @Patch('/:id')
  @UseGuards(TypeValidationGuard)
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ViewDetailedEventDto> {
    return plainToInstance(
      ViewDetailedEventDto,
      await this.eventService.update(id, updateEventDto),
    );
  }

  @Delete('/:id')
  @UseGuards(TypeValidationGuard)
  remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}
