import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const hotels = await hotelsService.getHotelsWithRooms(userId, Number(hotelId));

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}
