const express = require("express");
const router = express.Router();
const {login,signUp} = require('../controller/authCont');

router.post('/login',login);
router.post('/signUp',signUp);

module.exports = router;