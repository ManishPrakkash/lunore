import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
};  