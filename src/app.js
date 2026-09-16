require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { apiLimiter } = require('./middleware/ratelimitmiddleware');
const { errorHandler, notFoundHandler } = require('./middleware/errormiddleware');
const { setupSwagger } = require('./config/swagger');

const authRoutes = require('./routes/authroutes');
const candidateRoutes = require("./routes/candidateroutes");
const companyRoutes = require("./routes/companyroutes");
const jobRoutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationroutes");
const adminRoutes = require("./routes/adminroutes");

const app = express();

// Security HTTP Headers (configured for Swagger compatibility)
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Request Logging
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// Body Parsers & Cookie Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Setup Interactive Swagger API Documentation on /api-docs and /api-docs.json
setupSwagger(app);

// Global API Rate Limiter
app.use('/api', apiLimiter);

// API Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// 404 Route Handler
app.use(notFoundHandler);

// Centralized Safe Error Handler
app.use(errorHandler);

module.exports = app;