/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { Address, Booking, Enrollment, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type CreateBookingParams = {
  roomId: number;
  userId: number;
};

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function getBookingReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'Room 1',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}
