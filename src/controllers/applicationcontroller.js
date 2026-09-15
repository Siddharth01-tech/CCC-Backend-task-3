const {createApplication,getApplicationsByCandidate,getApplicationsByRecruiter,updateApplicationStatus} = require("../models/applicationmodel");

const applyForJob = async (req, res) => {
    try {
        const {jobId,coverLetter} = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required"
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required"
            });
        }

        const resumeId = await getResumeIdByUserId(
            req.user.id
        );

        if (!resumeId) {
            return res.status(400).json({
                message: "Please upload your resume before applying"
            });
        }

        const application = await createApplication(
            jobId,
            req.user.id,
            resumeId,
            coverLetter
        );

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });
    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "You have already applied for this job"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await getApplicationsByCandidate(
            req.user.id
        );

        res.json({
            applications
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    applyForJob,
    getMyApplications,
};