import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async addPaymentMethod(
    @Context() context: any,
    @Args('type') type: string,
    @Args('last4') last4: string,
  ) {
    const user = context.req.user;
    await this.paymentService.addPaymentMethod(user, type, last4);
    return 'Payment method added';
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async myPayments(@Context() context: any) {
    const user = context.req.user;
    const payments = await this.paymentService.getMyPayments(user);
    return JSON.stringify(payments);
  }
}
