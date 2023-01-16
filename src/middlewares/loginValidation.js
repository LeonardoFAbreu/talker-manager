const emailValidation = require('./emailValidation');
const passwdValidation = require('./passwdValidation');

function loginValidation(req, res, next) {
const { email, password } = req.body;

try {
emailValidation(email);
passwdValidation(password);
next();
} catch (err) {
return res.status(400).json({ message: err.message });
}
}

module.exports = loginValidation;