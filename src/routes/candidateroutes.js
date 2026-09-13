const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {createCandidateProfile,getCandidateProfile,updateCandidateProfile} = require("../controllers/candidatecontroller");

router.post("/profile", authMiddleware, createCandidateProfile);

router.get("/profile",authMiddleware,getCandidateProfile);

router.put("/profile",authMiddleware,updateCandidateProfile);

module.exports = router;