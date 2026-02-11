import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createOrder(@Context() context: any) {
    const user = context.req.user;
    const order = await this.orderService.createOrder(user);
    return `Order Created: ${order.id}`;
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async myOrders(@Context() context: any) {
    const user = context.req.user;
    const orders = await this.orderService.getMyOrders(user);
    return JSON.stringify(orders);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async checkoutOrder(@Args('id') id: string) {
    await this.orderService.checkoutOrder(id);
    return 'Order Paid';
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  async cancelOrder(@Args('id') id: string) {
    await this.orderService.cancelOrder(id);
    return 'Order Cancelled';
  }
}
