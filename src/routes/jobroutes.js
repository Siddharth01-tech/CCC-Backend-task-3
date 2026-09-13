const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {createJobPost,getAllJobs} = require("../controllers/jobcontroller");

router.get("/getalljob",getAllJobs);

router.post("/createjob", authMiddleware,roleMiddleware("recruiter"),createJobPost);

module.exports = router;