import * as crypto from 'crypto';
import { Request } from 'express';

export function getHashedIp(req: Request): string {
  // Extract real IP behind proxies/load balancers
  const rawIp = 
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] as string ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  // Hash raw IP with a secret salt from environment variables
  const salt = process.env.IP_HASH_SALT || 'default_secret_salt_change_me';
  return crypto.createHmac('sha256', salt).update(rawIp).digest('hex');
}