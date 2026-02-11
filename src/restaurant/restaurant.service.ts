import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getRestaurants(user: any) {
    return this.prisma.restaurant.findMany({
      where: {
        country: user.country, // 🔥 Country restriction here
      },
    });
  }
}
