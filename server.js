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

//
//Sell
app.post("/api/sell/create", SellController.create)

//
// User
app.post("/api/user/signin", UserController.signIn);
app.get("/api/user/info", UserController.info)
app.put("/api/user/update", UserController.update);

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
