import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from '../../infrastructure/database/redis.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly redisRepository: RedisRepository,
    ) { }

    async generateTokens(userId: string, userAgent: string) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '7d' });

        const tokenData = {
            accessToken,
            refreshToken,
            userAgent,
        };

        await this.redisRepository.set(`User/${userId}/Token`, tokenData, 7 * 24 * 60 * 60);
        return tokenData;
    }

    async validateToken(userId: string, token: string, userAgent: string) {
        const tokenData = await this.redisRepository.get<any>(`User/${userId}/Token`);

        if (!tokenData) {
            throw new UnauthorizedException('Token not found');
        }

        if (tokenData.accessToken !== token || tokenData.userAgent !== userAgent) {
            throw new UnauthorizedException('Invalid token or User-Agent mismatch');
        }

        return true;
    }

    async refreshTokens(userId: string, refreshToken: string, userAgent: string) {
        const tokenData = await this.redisRepository.get<any>(`User/${userId}/Token`);

        if (!tokenData || tokenData.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }

        return this.generateTokens(userId, userAgent);
    }

    async revokeTokens(userId: string) {
        await this.redisRepository.del(`User/${userId}/Token`);
    }
}