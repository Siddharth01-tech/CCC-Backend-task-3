const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {createUser,findUserByEmail} = require("../models/usermodel");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const checkUser = await findUserByEmail(email);

        if (checkUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await createUser(
            name,
            email,
            passwordHash,
            role || "candidate"
        );

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (user.is_blocked) {
            return res.status(403).json({
                message: "User is blocked"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },process.env.JWT_SECRET,
        );
        
        res.cookie("token", token)

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const logout = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message:"logout successfully"
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login,
    logout
};