const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./src/helpers/databases/postgresql');

// generate table automatically
const User = require("./src/models/user");
const Role = require("./src/models/role");
const Product = require("./src/models/product");
const ApprovalStatus = require("./src/models/approval-status");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
 
   next();
});

const routes = require('./src/routes');

app.use(routes);

Role.hasOne(User);
ApprovalStatus.hasOne(Product);
User.belongsTo(Role, { constraint: true});
Product.belongsTo(ApprovalStatus, { constraint: true});

sequelize
    .sync()
    .then(() => { 
        app.listen(port);
    })
    .catch(err => {
        if (err)
            return res.status(400).json({
                "status": "error",
                "message": "Unable to communicate with database"
            })
    });