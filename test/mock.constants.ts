import { Event } from '../src/event/event.entity';
import { Paginated } from 'nestjs-paginate';

export const mockEvent1 = {
  id: 1,
  name: 'test',
  description: 'test description',
  type: 'ads',
  priority: 0,
} as Event;

export const mockEvent2 = {
  id: 2,
  name: 'test 2',
  description: 'test description 2',
  type: 'app',
  priority: 0,
} as Event;

export const mockEventsPage = {
  data: [mockEvent1, mockEvent2],
  meta: {
    itemsPerPage: 2,
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
  },
} as Paginated<Event>;
