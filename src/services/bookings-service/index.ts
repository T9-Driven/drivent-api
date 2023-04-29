import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function storeBooking(userId: number, roomId: number) {
  await verifyValidEnrollmentAndTicket(userId);

  const room = await roomRepository.getRoomWithBookings(roomId);
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.storeBooking(userId, roomId);
  return booking;
}

async function updateBooking(bookingId: number, userId: number, roomId: number) {
  await verifyValidEnrollmentAndTicket(userId);

  const room = await roomRepository.getRoomWithBookings(roomId);
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw forbiddenError();

  if (booking.userId !== userId) throw forbiddenError();

  await bookingRepository.updateBooking(bookingId, userId, roomId);
  return booking;
}

async function verifyValidEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw forbiddenError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  return;
}

export default {
  getBooking,
  storeBooking,
  updateBooking,
};
