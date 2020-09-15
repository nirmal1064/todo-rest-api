const { body } = require('express-validator');
const User = require('../models/user');

const signupValidator = () => {
    let errors = [
        body('name', 'Name is required').not().isEmpty(),
        body('username', 'Username should be alphanumeric').isAlphanumeric(),
        body('username', 'Username is required').not().isEmpty(),
        body('username').custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                User.findOne({ username: value }, (err, user) => {
                    if (err) {
                        reject(new Error('Server Error'));
                    }
                    if(user) {
                        reject(new Error('username already in use'));
                    }
                    resolve(true);
                });
            });
        }),
        body('password', 'Password should not be empty').not().isEmpty(),
        body('password', 'Password should be min 5 characters').isLength({ min: 5, max: 30 }),
        body('password2').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    ]
    return errors;
}
module.exports = signupValidator;
