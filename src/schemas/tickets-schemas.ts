import Joi from 'joi';
import { InputTicketBody } from '@/protocols';

export const ticketsSchema = Joi.object<InputTicketBody>({
  ticketTypeId: Joi.number().required(),
});
