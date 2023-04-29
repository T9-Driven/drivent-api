import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { StoreBookingSchema, UpdateBookingSchema } from '@/schemas/booking-schemas';
import { getBooking, storeBooking, updateBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', storeBooking, validateBody(StoreBookingSchema))
  .put('/:bookingId', validateBody(UpdateBookingSchema), updateBooking);

export { bookingRouter };
