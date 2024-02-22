const express = require('express');
const router = express.Router();
const {getById, update} = require('../controllers/FormController');
//const authGuard = require('../middlewares/authGuard');

router.get('/getbyid/:id', getById);
router.post('/update',update);

module.exports = router;