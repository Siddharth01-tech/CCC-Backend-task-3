const pool = require("../config/db");

const createJob = async (
    recruiterId,
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
) => {
    const result = await pool.query(
        `INSERT INTO jobs
        (
            recruiter_id,
            company_id,
            title,
            description,
            location,
            job_type,
            salary_min,
            salary_max,
            skills,
            experience,
            deadline
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *`,
        [
            recruiterId,
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
        ]
    );

    return result.rows[0];
};

const getAllJobs = async () => {
    const result = await pool.query(
        `SELECT *
         FROM jobs
         ORDER BY created_at DESC`
    );

    return result.rows;
};

module.exports = {
    createJob,
    getAllJobs
};