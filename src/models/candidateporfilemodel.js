const pool = require("../config/db");

const createProfile = async (
    userId,
    phone,
    skills,
    education,
    experience,
    location,
    bio
) => {
    const result = await pool.query(
        `INSERT INTO candidate_profiles
        (
            user_id,
            phone,
            skills,
            education,
            experience,
            location,
            bio
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
            userId,
            phone,
            skills,
            education,
            experience,
            location,
            bio
        ]
    );

    return result.rows[0];
};

const getProfile = async (userId) => {
    const result = await pool.query(
        `SELECT *
         FROM candidate_profiles
         WHERE user_id = $1`,
        [userId]
    );

    return result.rows[0];
};

const updateProfile = async (
    userId,
    phone,
    skills,
    education,
    experience,
    location,
    bio
) => {
    const result = await pool.query(
        `UPDATE candidate_profiles
         SET
            phone = $1,
            skills = $2,
            education = $3,
            experience = $4,
            location = $5,
            bio = $6,
            updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $7
         RETURNING *`,
        [
            phone,
            skills,
            education,
            experience,
            location,
            bio,
            userId
        ]
    );

    return result.rows[0];
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile
};