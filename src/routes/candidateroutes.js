const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware=require("../middleware/rolemiddleware");
const {uploadResume}=require("../middleware/uploadmiddleware")
const {createCandidateProfile,getCandidateProfile,updateCandidateProfile} = require("../controllers/candidatecontroller");

router.post("/createprofile", authMiddleware, roleMiddleware("candidate"), uploadResume.single("resume"),createCandidateProfile);

router.get("/getprofile",authMiddleware,roleMiddleware("candidate"),getCandidateProfile);

router.put("/updateprofile",authMiddleware,roleMiddleware("candidate"),uploadResume.single("resume"),updateCandidateProfile);

module.exports = router;