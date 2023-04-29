import { Booking } from '.prisma/client';
import { prisma } from '@/config';

async function getBooking(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({ where: { userId }, include: { Room: true } });
}

async function storeBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({ data: { userId, roomId } });
}

async function updateBooking(bookingId: number, userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.update({ where: { id: bookingId }, data: { userId, roomId } });
}

const bookingRepository = {
  getBooking,
  storeBooking,
  updateBooking,
};

export default bookingRepository;
