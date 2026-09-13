const pool = require("../config/db");

const createApplication = async (
    jobId,
    candidateId,
    resumeId,
    coverLetter
) => {
    const result = await pool.query(
        `INSERT INTO applications
        (
            job_id,
            candidate_id,
            cover_letter
        )
        VALUES ($1,$2,$3)
        RETURNING *`,
        [
            jobId,
            candidateId,
            resumeId,
            coverLetter
        ]
    );

    return result.rows[0];
};

const getApplicationsByCandidate = async (candidateId) => {
    const result = await pool.query(
        `SELECT *
         FROM applications
         WHERE candidate_id = $1
         ORDER BY created_at DESC`,
        [candidateId]
    );

    return result.rows;
};

module.exports = {
    createApplication,
    getApplicationsByCandidate
};