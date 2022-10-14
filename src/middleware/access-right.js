const supervisorAccess = async (req,res,next) => {
    if(req.roleId == 1){
        next()
    }else{
        return res.status(403).json({
            status: "error",
            message: "You don't have a right access to this endpoints"
        })
    }
};

const cashierAccess = async (req,res,next) => {
    if(req.roleId == 2){
        next()
    }else{
        return res.status(403).json({
            status: "error",
            message: "You don't have a right access to this endpoints"
        })
    }
};

const staffAccess = async (req,res,next) => {
    if(req.roleId == 3){
        next()
    }else{
        return res.status(403).json({
            status: "error",
            message: "You don't have a right access to this endpoints"
        })
    }
};

module.exports = {
    supervisorAccess,
    cashierAccess,
    staffAccess
}