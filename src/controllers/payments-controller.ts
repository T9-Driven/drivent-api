import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.paymentProcess(ticketId, userId, cardData);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
