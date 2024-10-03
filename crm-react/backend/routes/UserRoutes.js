const express = require('express');
const router = express.Router();

const {register,login} = require('../controllers/UserController');
const {userCreateValidation,loginValidation} = require('../middlewares/useValidation');
const validate = require('../middlewares/handleValidation');

//Routes
router.post('/register',userCreateValidation(),validate, register);
router.post('/login',loginValidation(),validate,login);
router.put('/update',login);
module.exports = router;