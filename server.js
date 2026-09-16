require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');
const { connectRedis } = require("./src/config/redis");

const PORT = process.env.PORT || 3000;

// Test DB Connection
pool.query("SELECT NOW()")
    .then(() => console.log("[Database] Connected successfully to PostgreSQL"))
    .catch((err) => console.warn(`[Database Warning] Could not connect to PostgreSQL: ${err.message}`));

// Connect Redis Cache
connectRedis();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
