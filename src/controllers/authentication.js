const User = require('../models/user');
const Role =  require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const {username, password, roleId} = req.body;
    
    // check if user already exist
    const user = await User
                        .findOne({
                            where: {
                                username: username
                            }
                        })
    if (user) {
        return res.status(409).json({
            "status": "fail",
            "data": {
                "username": "Username already exists"
            }
        })
    }

    // check if role doesn't exist yet
    const role = await Role
                    .findOne({
                        where: {
                            id: roleId
                        }
                    })
    if (!role) {
        return res.status(404).json({
            "status": "fail",
            "data": {
                "id": "Role Id not found"
            }
        })
    }

    // create a new user
    bcrypt.hash(password, 12).then(hashedPassword => {
        User
            .create({
                username: username,
                password: hashedPassword,
                roleId: roleId
            })  
            .then(result => {
                if (result)
                    return res.status(201).json({
                        "status": "success",
                        "data": null
                    })
            })
            .catch(err => {
                if (err)
                    return res.status(400).json({
                        "status": "error",
                        "message": "Unable to communicate with database"
                    })
            });
    });
};


const loginUser = async (req, res) => {
    const {username, password} = req.body;
    
    // validate user
    const user = await User
                    .findAll({
                        where: {
                            username: username
                        }
                    })
                    .then(result => {
                        return result[0].dataValues
                    })
                    .catch(err => {
                        if (err)
                            return res.status(404).send({
                                status: "fail",
                                data: {
                                    username: "Username does not exists yet!"
                                }
                            })
                    })
    
    // validate credentials
    const matching = await bcrypt.compare(password, user.password);
    if (matching){ 
        const token = jwt.sign({
            userId: user.id,
            username: user.username,
            roleId: user.roleId
        }, 
        "secret",
        {
            expiresIn: '1h'
        });
        
        return res.status(200).send({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    roleId: user.roleId
                },
                token: token
            }
        });
  
    } else {
        return res.status(400).send({
            status: "fail",
            data: {
                email: "email and password doesn't match",
                password: "email and password doesn't match",
            }
        })
    }
};

module.exports = {
    registerUser,
    loginUser
}