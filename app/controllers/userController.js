const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
        name: req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    user.save((err, result) => {
        if (err) return res.status(500).send("Problem in registering the user");
        const token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    });
}

const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send({ message: "Internal Server Error" });
        if (!result) return res.status(404).send({ message: "User Not found" });
        const passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    });
}

const home = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token present' });
    User.findById(req.userId, { password: 0 } , (error, result) => {
        if (!error) {
            if (!result) {
                res.status(404).send({ message: "User not found"});
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send({message: error.message || "Internal Error"});
        }
    });
}

const logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

module.exports = { register, login, home, logout };
