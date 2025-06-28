const { PrismaClient } = require("@prisma/client");
const { create } = require("domain");
const prisma = new PrismaClient();

module.exports = {
    ServiceController :{
        create: async (req,res) =>{
            try{
                await prisma.service.create({
                    data:{
                        name : req.body.name,
                        price : req.body.price,
                        remark: req.body.remark,
                        payDate: new Date()
                    }
                })
                res.json({message:'success'})
            }catch(error){
                res.status(500).json({error:error.message})
            }
        },
        list: async (req,res) =>{
            try{
                const service = await prisma.service.findMany({
                    orderBy:{
                        payDate:'desc'
                    }
                })
                res.json(service)
            }catch(error){
                res.status(500).json({error:error.message})
            }
        },
        update: async (req,res) =>{
            try{
                const serviceId = req.params.id;
                await prisma.service.update({
                    where:{
                        id: serviceId
                    },
                    data:{
                        name : req.body.name,
                        price : req.body.price,
                        remark: req.body.remark
                    }
                })
                res.json({message: 'success'})
            }catch(error){
                res.status(500).json({error:error.message})
            }
        },
        remove: async (req,res) =>{
            try{
                const serviceId = req.params.id;
                await prisma.service.delete({
                    where:{
                        id: serviceId
                    }
                })
                res.json({message: 'success'})
            }catch(error){
                res.status(500).json({error:error.message})
            }
        }
    }
}