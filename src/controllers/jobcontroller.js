const {
    createJob,
    getJobs
} = require("../models/jobmodel");

const createJobPost = async (req, res) => {
    try {
        const {companyId,title,description,location,jobType,salaryMin,salaryMax,skills,experience,deadline} = req.body;

        const job = await createJob({
            recruiterId: req.user.id,
            companyId,
            title,
            description,
            location,
            jobType,
            salaryMin,
            salaryMax,
            skills,
            experience,
            deadline
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await getJobs();

        res.json({
            jobs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    createJobPost,
    getAllJobs
};