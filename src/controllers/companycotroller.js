const {
    createCompany
} = require("../models/companymodel");

const createCompanyProfile = async (req, res) => {
    try {
        const {companyName,description,website,location,industry} = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required"
            });
        }

        const company = await createCompany(
            req.user.id,
            companyName,
            description,
            website,
            location,
            industry
        );

        res.status(201).json({
            message: "Company created successfully",
            company
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    createCompanyProfile
};