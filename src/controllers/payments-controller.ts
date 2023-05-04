import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);

    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;

  try {
    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.postPayment(ticketId, userId, cardData);

    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
