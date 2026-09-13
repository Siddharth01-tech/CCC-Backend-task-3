require('dotenv').config();
const express= require('express');
const authRoutes = require('./routes/authroutes');
const candidateRoutes = require("./routes/candidateroutes");
const companyRoutes = require("./routes/companyroutes");
const jobRoutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationroutes");

const app= express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

module.exports=app