import { notFoundError } from '@/errors';
import { CreateTicketParams } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Ticket, TicketStatus, TicketType } from '@prisma/client';

async function getTicketType(): Promise<TicketType[]> {
  const ticketTypes: TicketType[] = await ticketsRepository.findTicketTypes();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getUserTickets(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticketData: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

const ticketService = { getTicketType, getUserTickets, postTicket };

export default ticketService;
