const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { UserController } = require("./controllers/UserController");
const { CompanyController } = require("./controllers/CompanyController");
const { ProductController } = require("./controllers/ProductController");
const { SellController} = require("./controllers/SellController")
const { ServiceController } = require("./controllers/ServiceController") 

//
//service
app.post("/api/service/create",ServiceController.create)
app.get("/api/service/list",ServiceController.list)
app.put("/api/service/update/:id", ServiceController.update);
app.delete("/api/service/delete/:id", ServiceController.remove);

//
//Sell
app.post("/api/sell/create", SellController.create)
app.get("/api/sell/list", SellController.list)
app.delete("/api/sell/remove/:id", SellController.remove)
app.get("/api/sell/confirm", SellController.confirm)

//
// User
app.post("/api/user/signin", UserController.signIn);
app.get("/api/user/info", UserController.info)
app.put("/api/user/update", UserController.update);
app.get("/api/user/list", UserController.list)

//
// Company
app.post("/api/company/create", CompanyController.createCompany);
app.get("/api/company/list", CompanyController.getCompany);

//
// Product
app.post("/api/buy/create", ProductController.create);
app.get("/api/buy/list", ProductController.list);
app.put("/api/buy/update/:id", ProductController.update);
app.delete("/api/buy/delete/:id", ProductController.remove);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
