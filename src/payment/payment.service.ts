import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async addPaymentMethod(user: any, type: string, last4: string) {
    return this.prisma.paymentMethod.create({
      data: {
        userId: user.userId,
        type,
        last4,
      },
    });
  }

  async getMyPayments(user: any) {
    return this.prisma.paymentMethod.findMany({
      where: {
        userId: user.userId,
      },
    });
  }
}
