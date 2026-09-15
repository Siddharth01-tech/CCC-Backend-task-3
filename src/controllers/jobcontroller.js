const {createJob,getJobs,getJobById,updateJob,deleteJob} = require("../models/jobmodel");

const createJobPost = async (req, res) => {
    try {
        const {companyId,title,description,location,jobType,salaryMin,salaryMax,skills,experience,deadline} = req.body;

        if (!companyId || !title || !description || !jobType) {
            return res.status(400).json({
                message: "Company ID, title, description and job type are required"
            });
        }

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

const getSingleJob = async (req, res) => {
    try {
        const job = await getJobById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateJobPost = async (req, res) => {
    try {
        const job = await updateJob(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found or you are not the owner"
            });
        }

        res.json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteJobPost = async (req, res) => {
    try {
        const job = await deleteJob(
            req.params.id,
            req.user.id
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found or you are not the owner"
            });
        }

        res.json({
            message: "Job deleted successfully"
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
    getAllJobs,
    getSingleJob,
    updateJobPost,
    deleteJobPost
};