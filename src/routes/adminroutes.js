const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {
    getUsers,
    getUser,
    blockUserAccount,
    unblockUserAccount,
    getJobs,
    removeJob
} = require("../controllers/admincontroller");

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.put("/users/:id/block", blockUserAccount);

router.put("/users/:id/unblock", unblockUserAccount);
router.get("/jobs", getJobs);

router.delete("/jobs/:id", removeJob);

module.exports = router;