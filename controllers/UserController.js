const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

module.exports = {
    UserController: {
        signIn: async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;

                const user = await prisma.user.findFirst({
                    where: {
                        username: username,
                        password: password,
                        status: "active"
                    }
                });

                if (!user) {
                    return res.status(401).json({
                        message: "Invalid username or password"
                    });
                }

                const token = jwt.sign({
                    id: user.id,
                }, process.env.SECRET_KEY, {
                    expiresIn: "1m"
                });

                return res.status(200).json({
                    message: "Login successful",
                    token: token
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }
}
