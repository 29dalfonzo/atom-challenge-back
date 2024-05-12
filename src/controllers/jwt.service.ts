import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (data: any): string => {
    return jwt.sign(data, secret, { expiresIn: '1h' });
};


// Middleware de autenticación
export function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
}