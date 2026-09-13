const {createProfile,getProfile,updateProfile} = require('../models/candidateporfilemodel')

const createCandidateProfile = async (req, res) => {
    try {
        const {phone,skills,education,experience,location,bio} = req.body;

        const profile = await createProfile(
            req.user.id,
            phone,
            skills,
            education,
            experience,
            location,
            bio
        );

        res.status(201).json({
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getCandidateProfile = async (req, res) => {
    try {
        const profile = await getProfile(req.user.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(profile);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateCandidateProfile = async (req, res) => {
    try {
        const {phone,skills,education,experience,location,bio} = req.body;

        const profile = await updateProfile(
            req.user.id,
            phone,
            skills,
            education,
            experience,
            location,
            bio
        );

        res.json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    createCandidateProfile,
    getCandidateProfile,
    updateCandidateProfile
};