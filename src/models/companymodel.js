const pool = require("../config/db");

const createCompany = async (
    recruiterId,
    companyName,
    description,
    website,
    location,
    industry,
    logoName,
    logoUrl
) => {
    const result = await pool.query(
        `INSERT INTO companies
        (
            recruiter_id,
            company_name,
            description,
            website,
            location,
            industry,
            logo_name,
            logo_url
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *`,
        [
            recruiterId,
            companyName,
            description,
            website,
            location,
            industry,
            logoName,
            logoUrl
        ]
    );

    return result.rows[0];
};

const getCompanyByRecruiter = async (recruiterId) => {
    const result = await pool.query(
        `SELECT *
         FROM companies
         WHERE recruiter_id = $1`,
        [recruiterId]
    );

    return result.rows[0];
};

const updateCompany = async (
    recruiterId,
    companyName,
    description,
    website,
    location,
    industry,
    logoName,
    logoUrl
) => {
    const result = await pool.query(
        `UPDATE companies
         SET
            company_name = $1,
            description = $2,
            website = $3,
            location = $4,
            industry = $5,
            logo_name = $6,
            logo_url = $7,
            updated_at = CURRENT_TIMESTAMP
         WHERE recruiter_id = $8
         RETURNING *`,
        [
            companyName,
            description,
            website,
            location,
            industry,
            logoName,
            logoUrl,
            recruiterId
        ]
    );

    return result.rows[0];
};

module.exports = {
    createCompany,
    getCompanyByRecruiter,
    updateCompany
};