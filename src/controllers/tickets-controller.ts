import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';
import { InputTicketBody } from '@/protocols';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const ticketTypes = await ticketService.getTicketType();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (e) {
    next(e);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (e) {
    next(e);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { ticketTypeId } = req.body as InputTicketBody;

  try {
    const ticket = await ticketService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (e) {
    next(e);
  }
}
