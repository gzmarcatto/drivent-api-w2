import { getPaymentByTicketId, postPayment } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentByTicketId);
paymentsRouter.all('/*', authenticateToken).post('/process', postPayment)

export { paymentsRouter };
