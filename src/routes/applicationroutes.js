const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {applyForJob,getMyApplications} = require("../controllers/applicationcontroller");

router.post("/applyforjob",authMiddleware,roleMiddleware("candidate"),applyForJob);

router.get("/myapplication",authMiddleware,roleMiddleware("candidate"),getMyApplications);

module.exports = router;