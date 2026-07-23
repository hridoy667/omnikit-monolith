import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AiUsageGuard implements CanActivate {
  // Inject the Redis client directly from @nestjs-modules/ioredis
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Retrieves user identifier set by your JWT strategy/auth guard
    const identifier = req.user?.userId || req.user?.id;

    if (!identifier) {
      throw new HttpException(
        'Missing authorization or guest session token.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const redisKey = `ai_usage:${identifier}:${today}`;

    // Atomically increment usage
    const usageCount = await this.redis.incr(redisKey);

    // If this is the first use today, set expiration to 24 hours (86400 seconds)
    if (usageCount === 1) {
      await this.redis.expire(redisKey, 86400);
    }

    if (usageCount > 2) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message:
            'You have reached your limit of 2 free AI usages for today. Please create an account or try again tomorrow!',
          remaining: 0,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}