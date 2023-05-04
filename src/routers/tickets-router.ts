import { getTicketTypes, getTickets, postTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketTypes);
ticketsRouter.all('/*', authenticateToken).get('/', getTickets)
ticketsRouter.all('/*', authenticateToken).post('/', postTicket)

export { ticketsRouter };
