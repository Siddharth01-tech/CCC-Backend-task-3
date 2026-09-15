const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {createJobPost,getAllJobs,getSingleJob,updateJobPost,deleteJobPost} = require("../controllers/jobcontroller");

router.get("/getalljob",getAllJobs);
router.get("/getajob/:id",getSingleJob);
router.post("/createjob", authMiddleware,roleMiddleware("recruiter"),createJobPost);
router.put("/updateajob/:id",authMiddleware,roleMiddleware("recuiter"),updateJobPost);
router.delete("/deletejob/:id",authMiddleware,roleMiddleware("recuiter"),deleteJobPost);

module.exports = router;