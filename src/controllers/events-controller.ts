import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import eventsService from '@/services/events-service';

export async function getDefaultEvent(_req: Request, res: Response, next: NextFunction) {
  try {
    const event = await eventsService.getFirstEvent();
    return res.status(httpStatus.OK).send(event);
  } catch (error) {
    next(error);
  }
}
