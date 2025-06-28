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
                    expiresIn: "7d"
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
        },
        info: async (req,res) =>{
            try{
                const headers = req.headers.authorization;
                const token = headers.split(" ")[1];
                const decoded = jwt.verify(token,process.env.SECRET_KEY)
                const user = await prisma.user.findFirst({
                    where : {id : decoded.id},
                    select:{
                        name:true,
                        level:true,
                        username:true
                    }
                })
                res.json(user);
            }catch(error){
                res.status(500).json({message:error.message});
            }
        },
        update: async (req,res) =>{
            try{
                const headers = req.headers.authorization;
                const token = headers.split(" ")[1];
                const decoded = jwt.verify(token,process.env.SECRET_KEY);
                const oldUser = await prisma.user.findFirst({
                    where:{id :decoded.id}
                })
                const newPassword = req.body.password !== "" ? req.body.password : oldUser.password
                await prisma.user.update({
                    where:{id : decoded.id},
                    data:{
                        name:req.body.name,
                        username:req.body.username,
                        password:newPassword
                    }
                });
                res.status(200).json({message:'success'})
            }catch(error){
                res.status(500).json({message:error.message});
            }
        },
        list: async (req,res) =>{
            try{
                const users = await prisma.user.findMany({
                    where:{
                        status:'active'
                    },
                    orderBy:{
                        id:'desc'
                    }
                })
                res.json(users)
            }catch(error){
                res.status(500).json({message:error.message});
            }
        },
        create:async (req,res) =>{
            try{
                await prisma.user.create({
                    data:{
                        name:req.body.name,
                        username:req.body.username,
                        password:req.body.password,
                        level:req.body.level
                    }
                })
                res.json({message:"success"})
            }catch(error){
                res.status(500).json({message:error.message});
            }
        },
        updateRow:async (req,res) =>{
            try{
                const userId = req.params.id;
                const oldUser = await prisma.user.findFirst({
                    where:{id: userId}
                })
                const newPassword = req.body.password !== "" ? req.body.password : oldUser.password;

                await prisma.user.update({
                    where:{id: userId},
                    data:{
                        name:req.body.name,
                        username:req.body.username,
                        password:newPassword,
                        level:req.body.level
                    }
                })
                res.json({message:"success"})
            }catch(error){
                res.status(500).json({message:error.message});
            }
        },
        remove:async (req,res) =>{
            try{
                const userId = req.params.id;
                await prisma.user.update({
                    where:{id: userId},
                    data:{
                        status:'inactive'
                    }
                })
                res.status(200).json({message:"success"})
            }catch(error){
                res.status(500).json({message:error.message});
            }
        }
    }
}
