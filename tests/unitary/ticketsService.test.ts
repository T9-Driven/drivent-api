import { enrollmentWithAddressReturn, findTicketByEnrollmentIdReturn, getTicketTypeReturn } from '../factories';
import { notFoundError } from '@/errors';

import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import ticketService from '@/services/tickets-service';

describe('getTicketTypes function', () => {
  it('should get ticket types', async () => {
    const ticketTypes = getTicketTypeReturn();

    jest.spyOn(ticketsRepository, 'findTicketTypes').mockResolvedValue(ticketTypes);

    const result = await ticketService.getTicketType();

    expect(result).toEqual(ticketTypes);
  });

  it('should not found ticket types', async () => {
    jest.spyOn(ticketsRepository, 'findTicketTypes').mockResolvedValue(null);

    await expect(ticketService.getTicketType()).rejects.toEqual(notFoundError());
  });
});

describe('getTicketByUserId function', () => {
  it('should get hotels', async () => {
    const userId = 1;
    const ticket = findTicketByEnrollmentIdReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticket);

    const result = await ticketService.getTicketByUserId(userId);

    expect(result).toEqual(ticket);
  });

  it('should not found enrollment', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });

  it('should not found ticket', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });
});

describe('createTicket function', () => {
  it('should create ticket', async () => {
    const userId = 1;
    const ticketTypeId = 1;
    const enrollment = enrollmentWithAddressReturn();
    const ticket = findTicketByEnrollmentIdReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollment);

    jest.spyOn(ticketsRepository, 'createTicket').mockResolvedValue(null);

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticket);

    const result = await ticketService.createTicket(userId, ticketTypeId);

    expect(result).toEqual(ticket);
  });

  it('should not found enrollment', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });
});
