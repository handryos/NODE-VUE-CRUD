export abstract class Authentication {
    static jwtSecret = process.env.JWT_SECRET || 'secret';
}
