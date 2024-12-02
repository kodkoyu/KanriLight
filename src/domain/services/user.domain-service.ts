import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserReadRepository } from '../../persistence/repositories/users/user.read.repository';
import { UserWriteRepository } from '../../persistence/repositories/users/user.write.repository';
import { HashingUtil } from '../../shared/utilities/hashing.util';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class UserDomainService {
  constructor(
    private readonly userReadRepository: UserReadRepository,
    private readonly userWriteRepository: UserWriteRepository,
    private readonly authService: AuthService,
  ) {}

  async register(userData: { name: string; email: string; password: string }): Promise<any> {
    const { name, email, password } = userData;

    const existingUser = await this.userReadRepository.existsByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = HashingUtil.hash(password);
    const user = await this.userWriteRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: [],
    });

    const tokens = await this.authService.generateTokens(user.id, user.roles || [], 'Unknown');
    return tokens;
  }

  async login(userData: { email: string; password: string }, userAgent: string): Promise<any> {
    const { email, password } = userData;
    const user = await this.userReadRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = HashingUtil.verify(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.generateTokens(user.id, user.roles || [], userAgent);
  }

  async refresh(refreshToken: string, userAgent: string): Promise<any> {
    const userId = this.authService.decodeRefreshToken(refreshToken)?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.generateTokens(userId, [], userAgent);
  }
}