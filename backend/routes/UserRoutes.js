const express = require('express');
const router = express.Router();

const {register} = require('../controllers/UserController');
const {userCreateValidation} = require('../middlewares/useValidation')


//Routes
router.post('/register',userCreateValidation(), register);

module.exports = router;