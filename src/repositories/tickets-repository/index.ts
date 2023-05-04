import { CreateTicketParams } from '@/protocols';
import { prisma } from '@/config';
import { futimesSync } from 'fs';

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findTicketWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = { findTicketTypes, findTicketByEnrollmentId, createTicket, findTicketById, findTicketWithTypeById };

export default ticketsRepository;
