import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketService.getTicketType();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userTickets = await ticketService.getUserTickets(userId);

    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const ticket = await ticketService.postTicket(userId, ticketTypeId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
