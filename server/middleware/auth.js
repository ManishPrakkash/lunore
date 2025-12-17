import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware to verify JWT token
 */
export const requireAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        console.log('🔐 Auth Check - Authorization header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ No token provided');
            return res.status(401).json({
                success: false,
                message: 'Authentication required - No token provided'
            });
        }

        // Extract token (remove "Bearer " prefix)
        const token = authHeader.substring(7);
        
        // Verify token
        const decoded = verifyToken(token);
        console.log('🔓 Token decoded:', decoded);

        // Get user from database
        const user = await User.findById(decoded.userId);
        
        console.log('👤 User found in DB:', user ? `${user.email} (${user.role})` : 'NOT FOUND');

        if (!user) {
            console.log('❌ User not found for token');
            return res.status(401).json({
                success: false,
                message: 'Invalid token - User not found'
            });
        }

        // Attach user to request
        req.user = user;
        console.log('✅ User authenticated:', user.email, user.role);
        next();
    } catch (error) {
        console.error('❌ Authentication error:', error.message);
        
        if (error.message === 'Invalid or expired token') {
            return res.status(401).json({
                success: false,
                message: 'Token expired or invalid - Please login again'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: error.message
        });
    }
};

/**
 * Middleware to verify user has admin role
 */
export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({
            success: false,
            message: 'Authorization error',
            error: error.message
        });
    }
};