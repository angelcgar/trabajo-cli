import { createHmac } from 'node:crypto';

export function generateHash(text: string, secret: string) {
	return createHmac('sha256', secret).update(text).digest('hex');
}
