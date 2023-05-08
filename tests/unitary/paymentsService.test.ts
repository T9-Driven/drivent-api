import {
  cardPaymentParamsReturn,
  enrollmentByIdReturn,
  findPaymentByTicketIdReturn,
  findTickeWithTypeById,
  findTickeyByIdReturn,
} from '../factories';
import { notFoundError, unauthorizedError } from '@/errors';

import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentService from '@/services/payments-service';

describe('verifyTicketAndEnrollment function', () => {
  it('should return not found ticket error', async () => {
    const ticketId = 1;
    const userId = 1;

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(null);

    await expect(paymentService.verifyTicketAndEnrollment(ticketId, userId)).rejects.toEqual(notFoundError());
  });

  it('should return not found ticket error', async () => {
    const userId = 2;
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);

    await expect(paymentService.verifyTicketAndEnrollment(ticket.id, userId)).rejects.toEqual(unauthorizedError());
  });
});

describe('getPaymentByTicketId function', () => {
  it('should get payment by ticket id', async () => {
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();
    const payment = findPaymentByTicketIdReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);
    jest.spyOn(paymentsRepository, 'findPaymentByTicketId').mockResolvedValue(payment);

    const result = await paymentService.getPaymentByTicketId(enrollment.userId, ticket.id);

    expect(result).toEqual(payment);
  });
  it('should return not found payment error', async () => {
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);
    jest.spyOn(paymentsRepository, 'findPaymentByTicketId').mockResolvedValue(null);

    await expect(paymentService.getPaymentByTicketId(enrollment.userId, ticket.id)).rejects.toEqual(notFoundError());
  });
});

describe('paymentProcess function', () => {
  it('should process payment', async () => {
    const ticket = findTickeyByIdReturn();
    const ticketType = findTickeWithTypeById();
    const enrollment = enrollmentByIdReturn();
    const payment = findPaymentByTicketIdReturn();
    const cardParams = cardPaymentParamsReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);

    jest.spyOn(ticketsRepository, 'findTickeWithTypeById').mockResolvedValue(ticketType);
    jest.spyOn(paymentsRepository, 'createPayment').mockResolvedValue(payment);
    jest.spyOn(ticketsRepository, 'ticketProcessPayment').mockResolvedValue(null);

    const result = await paymentService.paymentProcess(enrollment.userId, ticket.id, cardParams);

    expect(result).toEqual(payment);
  });
});
