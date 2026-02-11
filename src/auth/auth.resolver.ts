import {
  Args,
  Mutation,
  Resolver,
  Query,
  registerEnumType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role, Country } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

/**
 * Register Prisma Enums to GraphQL
 */
registerEnumType(Role, {
  name: 'Role',
});

registerEnumType(Country, {
  name: 'Country',
});

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Health Check (GraphQL requires at least one Query root)
   */
  @Query(() => String)
  health() {
    return 'API is running';
  }

  /**
   * Register User
   */
  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { type: () => Role }) role: Role,
    @Args('country', { type: () => Country }) country: Country,
  ) {
    await this.authService.register(email, password, role, country);
    return 'User registered successfully';
  }

  /**
   * Login User
   */
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return result.access_token;
  }

  /**
   * ADMIN ONLY TEST QUERY (RBAC Test)
   */
  @Query(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  adminOnly() {
    return 'You are ADMIN';
  }
}
