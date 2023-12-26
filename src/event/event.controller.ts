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
import { ViewEventSummaryDto } from './dto/view-event-summary.dto';
import { plainToInstance } from 'class-transformer';
import { ViewEventDto } from './dto/view-detailed-event';
import { EventValidationGuard } from './event-validation/event-validation.guard';
import { EventValidationService } from './event-validation/event-validation.service';

@Controller()
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventValidationService: EventValidationService,
  ) {}

  @Get('/is-authorized')
  async isAuthorized(@Ip() ip: string): Promise<boolean> {
    return this.eventValidationService.isIpAuthorized(ip);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ViewEventSummaryDto>> {
    const events = await this.eventService.findAll(query);

    return plainToInstance(Paginated<ViewEventSummaryDto>, {
      ...events,
      data: plainToInstance(ViewEventSummaryDto, events.data),
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ViewEventDto> {
    return plainToInstance(ViewEventDto, await this.eventService.findOne(id));
  }

  @Post()
  @UseGuards(EventValidationGuard)
  async create(@Body() createEventDto: CreateEventDto): Promise<ViewEventDto> {
    return plainToInstance(
      ViewEventDto,
      await this.eventService.create(createEventDto),
    );
  }

  @Patch('/:id')
  @UseGuards(EventValidationGuard)
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ViewEventDto> {
    return plainToInstance(
      ViewEventDto,
      await this.eventService.update(id, updateEventDto),
    );
  }

  @Delete('/:id')
  @UseGuards(EventValidationGuard)
  remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}
