import { prisma } from '@/config';

async function getRoomWithBookings(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      Booking: true,
    },
  });
}

const roomRepository = {
  getRoomWithBookings,
};

export default roomRepository;
