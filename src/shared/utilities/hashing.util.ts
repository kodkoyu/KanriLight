import * as crypto from 'crypto';

export class HashingUtil {
  private static readonly key = process.env.HMAC_SECRET || 'default_secret';

  static hash(text: string): string {
    const hmac = crypto.createHmac('sha512', this.key);
    hmac.update(text);
    return hmac.digest('hex');
  }

  static verify(inputText: string, storedHash: string): boolean {
    const hashedText = this.hash(inputText);
    return crypto.timingSafeEqual(
      Buffer.from(hashedText),
      Buffer.from(storedHash),
    );
  }
}