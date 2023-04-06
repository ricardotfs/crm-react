const express = require('express');
const router = express.Router();

const {register} = require('../controllers/UserController');
const {userCreateValidation} = require('../middlewares/useValidation');
const validate = require('../middlewares/handleValidation');

//Routes
router.post('/register',userCreateValidation(),validate, register);

module.exports = router;