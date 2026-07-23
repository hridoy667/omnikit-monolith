import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AiUsageGuard implements CanActivate {
  private readonly logger = new Logger(AiUsageGuard.name);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    let identifier = req.user?.userId || req.user?.id || req.user?.sub;

    // Fallback: If req.user was not populated by a Passport AuthGuard, manually decode the JWT
    if (!identifier && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const [type, token] = authHeader.split(' ');

      if (type === 'Bearer' && token) {
        try {
          // Decode without strict verification or verify using JwtService
          const decoded = this.jwtService.decode(token) as any;

          if (decoded) {
            identifier = decoded.userId || decoded.id || decoded.sub;
            req.user = decoded; // Attach to request context
          }
        } catch (err: any) {
          this.logger.warn(`Failed to decode JWT token: ${err.message}`);
        }
      }
    }

    if (!identifier) {
      this.logger.error('Guard Check Failed: Identifier is null or undefined');
      throw new HttpException(
        'Missing authorization or guest session token.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const redisKey = `ai_usage:${identifier}:${today}`;

    // Atomically increment usage
    const usageCount = await this.redis.incr(redisKey);

    // if (usageCount === 1) {
    //   await this.redis.expire(redisKey, 86400);
    // }

    // if (usageCount > 2) {
    //   throw new HttpException(
    //     {
    //       statusCode: HttpStatus.TOO_MANY_REQUESTS,
    //       message:
    //         'You have reached your limit of 2 free AI usages for today. Please create an account or try again tomorrow!',
    //       remaining: 0,
    //     },
    //     HttpStatus.TOO_MANY_REQUESTS,
    //   );
    // }
    return true;
  }
}