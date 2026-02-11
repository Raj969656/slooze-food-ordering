import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(user: any) {
    return this.prisma.order.create({
      data: {
        userId: user.userId,
        status: OrderStatus.CREATED,
        country: user.country, // 🔥 country restriction applied
      },
    });
  }

  async getMyOrders(user: any) {
    return this.prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });
  }

  async checkoutOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.PAID },
    });
  }

  async cancelOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
    });
  }
}
