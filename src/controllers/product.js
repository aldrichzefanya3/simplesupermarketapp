const ApprovalStatus = require('../models/approval-status');
const Product = require('../models/product');


const getAllProducts = async (req, res) => {
    data = await Product.findAll({
        attributes: ['id', 'name', 'amount', 'reason', 'approverId', 'createdAt', 'updatedAt'],
        include: [
            {model: ApprovalStatus, attributes: ['id','name']}
        ] 
    });

    return res.status(200).json({
        "status": "success",
        "data": {
            "products": data
        }
    }) 
};


const getAllApprovedProducts = async (req, res) => {
    const status = req.params.statusId;

    data = await Product.findAll({
        where: {
            approvalStatusId: status
        }, 
        attributes: ['id', 'name', 'amount', 'reason', 'approverId', 'createdAt', 'updatedAt'],
        include: [
            {model: ApprovalStatus, attributes: ['id','name']}
        ] 
    });

    return res.status(200).json({
        "status": "success",
        "data": {
            "products": data
        }
    }) 
};


const getProductById = async (req, res) => {
    const id = req.params.id;

    data = await Product.findOne({
        where: {
            id: id
        }, 
        attributes: ['id', 'name', 'amount', 'reason', 'approverId', 'createdAt', 'updatedAt'],
        include: [
            {model: ApprovalStatus, attributes: ['id','name']}
        ] 
    });

    return res.status(200).json({
        "status": "success",
        "data": {
            "product": data
        }
    }) 
};


const createProduct = async (req, res) => {
    const {name, amount} = req.body;
    const defaultApprovalStatusId = 1; 

    /* 
        List of approval status -> id: 1 -> waiting
                                       2 -> approved
                                       3 -> rejected
    */

    // check availability and approval status of product 
    const product = await Product
                                .findOne({
                                    where: {
                                        name: name
                                    }
                                })

    if (product != null && product.approvalStatusId === 1){
        return res.status(409).send({
            status: "fail",
            data: {
                name: "Product name already exist in stock and waiting for approval"
            }
        })
    } else if (product != null && product.approvalStatusId === 2){
        return res.status(409).send({
            status: "fail",
            data: {
                name: "Product name already exist in stock with status approved"
            }
        })
    } 

    // create product
    const save = await Product.create({
                                name: name,
                                amount: amount,
                                approvalStatusId: defaultApprovalStatusId
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
                            })
    return save;
};


const updateApprovalStatusProduct = async (req, res) => {
    const payload = {
        body: {
            ...req.body,
            id: req.params.id,
            approverId: req.userId
        }
    };

    const {id, reason, approvalStatusId, approverId} = payload.body;
    
    // validate product id
    const product = await Product.findOne({ where: { id: id}});
    if (!product){
        return res.status(404).json({
            "status": false,
            "data": {
                product: "Product Id not found"
            }
        })
    };

    if (product.dataValues.approvalStatusId != 1){
        return res.status(400).send({
            status: "fail",
            data: {
                approvalStatusId: "Approval status of product already approved or rejected"
            }
        })
    }

    const data = await Product.update({
                                    reason: reason,
                                    approverId: approverId,
                                    approvalStatusId: approvalStatusId,
                                },
                                {
                                    where: { id: id }
                                })
                                .then(result => {
                                    if (result)
                                        return res.status(200).json({
                                            "status": true,
                                            "message": null
                                        })
                                })
                                .catch(err => {
                                    if (err)
                                        return res.status(400).json({
                                            "status": "error",
                                            "message": "Unable to communicate with database"
                                        })
                                });
    return data;
};


module.exports = {
    getAllProducts,
    getAllApprovedProducts,
    getProductById,
    createProduct,
    updateApprovalStatusProduct
}