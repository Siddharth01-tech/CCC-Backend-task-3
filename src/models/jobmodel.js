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

const getJobs = async () => {
    const result = await pool.query(
        `SELECT
            j.*,
            c.company_name
         FROM jobs j
         JOIN companies c
         ON j.company_id = c.id
         ORDER BY j.created_at DESC`
    );

    return result.rows;
};

const getJobById = async (jobId) => {
    const result = await pool.query(
        `SELECT
            j.*,
            c.company_name
         FROM jobs j
         JOIN companies c
         ON j.company_id = c.id
         WHERE j.id = $1`,
        [jobId]
    );

    return result.rows[0];
};

const updateJob = async (jobId, recruiterId, data) => {
    const {
        title,
        description,
        location,
        jobType,
        salaryMin,
        salaryMax,
        skills,
        experience,
        deadline
    } = data;

    const result = await pool.query(
        `UPDATE jobs
         SET
            title = $1,
            description = $2,
            location = $3,
            job_type = $4,
            salary_min = $5,
            salary_max = $6,
            skills = $7,
            experience = $8,
            deadline = $9,
            updated_at = CURRENT_TIMESTAMP
         WHERE id = $10
         AND recruiter_id = $11
         RETURNING *`,
        [
            title,
            description,
            location,
            jobType,
            salaryMin,
            salaryMax,
            skills,
            experience,
            deadline,
            jobId,
            recruiterId
        ]
    );

    return result.rows[0];
};

const deleteJob = async (jobId, recruiterId) => {
    const result = await pool.query(
        `DELETE FROM jobs
         WHERE id = $1
         AND recruiter_id = $2
         RETURNING *`,
        [jobId, recruiterId]
    );

    return result.rows[0];
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};