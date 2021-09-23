const express = require('express');
const router = express.Router();

router.use('/user', require('../controller/createUser'));

module.exports = router;