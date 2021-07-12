const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
    const err = { status: 400}
    const { name, budget } = req.body;
    if( name === undefined || budget === undefined){
        err.message = "name and budget are required"
        next(err)
    }
    else if (typeof name !== string) {
        err.message = 'name of account must be a string'
        next(err)
    }
    else if (name.trim().length < 3 || name.trim().length > 100 ) {
        err.message = 'name of account must be between 3 and 100'
        next(err)
    }
    else if(typeof budget !== 'number' || isNaN(budget)){
        err.message = 'budget of account must be a number'
        next(err)
    }
    else if(budget < 0 || budget > 1000000){
        err.message = "budget of account is too large or too small"
        next(err)
    }

    if(err.message){
        next(err)
    }
    else{
        next()
    }
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
