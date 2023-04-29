import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function storeBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body as { roomId: number };

  try {
    const { id } = await bookingService.storeBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { bookingId } = req.params as unknown as { bookingId: number };
  const { roomId } = req.body as { roomId: number };

  try {
    const { id } = await bookingService.updateBooking(bookingId, userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    next(error);
  }
}
