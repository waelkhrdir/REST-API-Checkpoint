const { body, validationResult } = require('express-validator');

const registerRules = () => [
    body("name","Field required").notEmpty(),
    body("email","you should enter valid email").isEmail(),
    body("phone","Field required").notEmpty(),
    body("password","password must be at least 6 characters").isLength({min:6})
]

const loginRules = () => [
    
    body("email","you should enter valid email").isEmail(),

    body("password","password must be at least 6 characters").isLength({min:6})
]

const bodyValidator = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array().map(error => error.msg)[0] });
    }
    else {
        next()
    }
}
module.exports = {bodyValidator,loginRules,registerRules}
