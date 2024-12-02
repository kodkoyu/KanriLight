import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from '../../infrastructure/database/redis.repository';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly hmacSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisRepository: RedisRepository,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'defaultJwtSecret';
    this.hmacSecret = this.configService.get<string>('HMAC_SECRET') || 'defaultHmacSecret';
  }

  getUserAgent(request: Request): string {
    return request.headers['user-agent'] || 'Unknown';
  }

  async generateTokens(userId: string, roles: string[], userAgent: string) {
    const payload = { sub: userId, roles };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: '7d',
    });

    const redisKey = `User:${userId}:UserAgent:${userAgent}`;
    await this.redisRepository.set(
      redisKey,
      JSON.stringify({ accessToken, refreshToken }),
      7 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(userId: string, refreshToken: string, userAgent: string) {
    const redisKey = `User:${userId}:UserAgent:${userAgent}`;
    const storedTokens = await this.redisRepository.get(redisKey);

    if (!storedTokens) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    const { refreshToken: storedRefreshToken } = JSON.parse(storedTokens.toString());

    if (storedRefreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return true;
  }

  decodeRefreshToken(token: string): { userId: string; roles: string[] } | null {
    try {
      const decoded = this.jwtService.verify(token, { secret: this.jwtSecret });
      return { userId: decoded.sub, roles: decoded.roles };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}