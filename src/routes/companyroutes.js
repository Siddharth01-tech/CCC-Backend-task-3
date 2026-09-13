const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {createCompanyProfile} = require("../controllers/companyController");

router.post("/createcompany",authMiddleware,roleMiddleware("recruiter"),createCompanyProfile);

module.exports = router;