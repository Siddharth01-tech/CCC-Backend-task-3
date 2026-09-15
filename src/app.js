require('dotenv').config();
const express= require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authroutes');
const candidateRoutes = require("./routes/candidateroutes");
const companyRoutes = require("./routes/companyroutes");
const jobRoutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationroutes");
const adminRoutes = require("./routes/adminroutes");

const app= express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

module.exports=app