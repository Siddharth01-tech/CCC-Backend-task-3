const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");
const{uploadLogo}=require("../middleware/uploadmiddleware");

const {createCompanyProfile,getMyCompany,updateMyCompany} = require("../controllers/companycotroller");

router.post("/createcompany",authMiddleware,roleMiddleware("recruiter"),uploadLogo.single("logo"),createCompanyProfile);
router.get("/getcompany",authMiddleware,roleMiddleware("recuiter"),getMyCompany);
router.put("/updatecompany",authMiddleware,roleMiddleware("recruiter"),uploadLogo.single("logo"),updateMyCompany);

module.exports = router;