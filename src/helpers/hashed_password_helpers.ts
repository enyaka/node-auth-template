import { createHash } from 'crypto';

function comparePasswords(password: string, savedPasswordHash: string): boolean {
    const hash = hashPassword(password)
    return hash === savedPasswordHash;
}

function hashPassword(password: string): string {
    const hash = createHash('sha256').update(password).digest('hex');
    return hash
}

export default {comparePasswords, hashPassword}