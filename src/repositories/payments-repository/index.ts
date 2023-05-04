import { prisma } from '@/config';
import { PaymentParams } from '@/protocols';

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export default { findPaymentByTicketId, postPayment };