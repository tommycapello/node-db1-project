const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
next()
}

exports.checkAccountNameUnique = (req, res, next) => {
next()
}

exports.checkAccountId = async (req, res, next) => {
    try{
        const account = await Account.getById(req.params.id)
        if(!account){
            next({
                status: 404,
                message: 'Account not found'
            })
        }
        else{
            req.account = account
            next()
        }
    }
    catch(err){
        next(err)
    }

}
