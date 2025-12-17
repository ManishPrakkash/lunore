import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email in MongoDB
        const user = await User.findOne({ email: email.toLowerCase() });

        console.log('🔍 Login attempt for email:', email);
        console.log('👤 User found:', user ? 'YES' : 'NO');

        if (!user) {
            console.log('❌ User not found in database');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        console.log('📧 User email in DB:', user.email);
        console.log('🔑 Password in DB:', user.password);
        console.log('🔑 Password provided:', password);
        console.log('✅ Passwords match:', user.password === password);

        if (user.password !== password) {
            console.log('❌ Password mismatch');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user);


        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt
        };

        console.log('✅ Login successful for:', user.email, '- Role:', user.role);

        res.json({
            success: true,
            message: 'Login successful',
            user: userData,
            token: token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});


router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

router.get('/me', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt
        };

        res.json({
            success: true,
            user: userData
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user info',
            error: error.message
        });
    }
});
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        console.log('📝 Registration attempt:', { email, name });

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and name are required'
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('❌ User already exists:', email);
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const newUser = new User({
            email: email.toLowerCase(),
            password,
            name,
            role: 'customer'
        });

        await newUser.save();
        console.log('✅ User created successfully:', newUser.email);

        // Generate JWT token
        const token = generateToken(newUser);

        const userData = {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        console.log('🎉 Registration successful for:', newUser.email);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userData,
            token: token  // Return JWT token
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        console.error('   Error name:', error.name);
        console.error('   Error message:', error.message);
        console.error('   Error stack:', error.stack);
        console.error('   Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
            errorName: error.name,
            errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router;
