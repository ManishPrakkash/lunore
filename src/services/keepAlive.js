import axios from 'axios';

const BACKEND_URL = 'https://lunore-backend.onrender.com';
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (Render free tier sleeps after 15 min of inactivity)

let pingInterval = null;

export const startKeepAlive = () => {
    if (pingInterval) {
        console.log('Keep-alive already running');
        return;
    }

    console.log('🔄 Starting backend keep-alive service...');

    // Ping immediately
    pingBackend();

    // Then ping every 14 minutes
    pingInterval = setInterval(pingBackend, PING_INTERVAL);
};

export const stopKeepAlive = () => {
    if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
        console.log('⏹️ Stopped backend keep-alive service');
    }
};

const pingBackend = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/health`, {
            timeout: 10000,
        });

        if (response.data.success) {
            console.log('✅ Backend is alive:', response.data.message);
        }
    } catch (error) {
        console.warn('⚠️ Backend ping failed:', error.message);
        // Don't throw - just log and continue
    }
};

export default { startKeepAlive, stopKeepAlive };
