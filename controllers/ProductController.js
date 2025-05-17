const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    ProductController: {
        create: async (req, res) => {
            try {
                const qty = req.body.qty;

                if (qty > 1000){
                    res.status(400).json({ error : "qty must be less than 1000"});
                }

                for(let i = 0 ; i < qty ; i++ ){
                    await prisma.product.create({
                        data: {
                            release: req.body.release,
                            serial: req.body.serial,
                            name: req.body.name,
                            color: req.body.color,
                            price: req.body.price,
                            customerName: req.body.customerName,
                            customerPhone: req.body.customerPhone,
                            customerAddress: req.body.customerAddress,
                            remark: req.body.remark ?? ""
                        }
                    });
                }
                return res.status(200).json({
                    message: "Product created successfully",
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        list: async (req, res) => {
            try {
                const products = await prisma.product.findMany({
                    orderBy: {
                        id: "desc"
                    },
                    where: {
                        status: {
                            not: "deleted"
                        }
                    }
                });
                return res.status(200).json(products);
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        update: async (req, res) => {
            try {
                await prisma.product.update({
                    where: { id: req.params.id },
                    data: {
                        release: req.body.release,
                        serial: req.body.serial,
                        name: req.body.name,
                        color: req.body.color,
                        price: req.body.price,
                        customerName: req.body.customerName,
                        customerPhone: req.body.customerPhone,
                        customerAddress: req.body.customerAddress,
                        remark: req.body.remark ?? ""
                    }
                });
                return res.status(200).json({
                    message: "Product updated successfully",
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        remove: async (req, res) => {
            try {
                await prisma.product.update({
                    where: { id: req.params.id },
                    data: {
                        status: "deleted"
                    }
                });
                return res.status(200).json({
                    message: "Product deleted successfully",
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }
}
