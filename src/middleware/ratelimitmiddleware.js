const rateLimit = require("express-rate-limit");

// General limiter for all incoming API traffic (100 requests per 15 minutes)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes."
    }
});

// Stricter limiter for sensitive auth routes like login and register (20 attempts per 15 minutes)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many authentication attempts from this IP, please try again after 15 minutes."
    }
});

module.exports = {
    apiLimiter,
    authLimiter
};
