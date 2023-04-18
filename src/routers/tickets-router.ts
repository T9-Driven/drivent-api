import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketTypes).get('/', getTickets).post('/', createTicket);

export { ticketsRouter };
