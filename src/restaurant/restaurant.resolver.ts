import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Context } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async myRestaurants(@Context() context: any) {
    const user = context.req.user;

    const restaurants = await this.restaurantService.getRestaurants(user);

    return JSON.stringify(restaurants);
  }
}
