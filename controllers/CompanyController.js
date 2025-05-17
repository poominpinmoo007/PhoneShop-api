const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    CompanyController: {
        createCompany: async (req, res) => {
            try {
                const oldCompany = await prisma.company.findFirst();
                const payload = {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    textCode: req.body.textCode
                }
                
                if (oldCompany) {
                    await prisma.company.update({
                        where: {
                            id: oldCompany.id
                        },
                        data: payload
                    });
                } else {
                    await prisma.company.create({
                        data: payload
                    });
                }
                return res.status(200).json({
                    message: "Company created successfully",
                    company: payload
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        getCompany: async (req, res) => {
            try {
                const company = await prisma.company.findFirst();
                return res.status(200).json(company);
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }
}
