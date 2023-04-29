import { prisma } from '@/config';

export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
    include: {
      Room: true,
    },
  });
}
