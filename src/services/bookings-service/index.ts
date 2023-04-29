import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function storeBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.storeBooking(userId, roomId);
  return booking;
}

async function updateBooking(bookingId: number, userId: number, roomId: number) {
  const booking = await bookingRepository.updateBooking(bookingId, userId, roomId);
  return booking;
}

export default {
  getBooking,
  storeBooking,
  updateBooking,
};
