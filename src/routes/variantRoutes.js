const express = require('express');
const { getVariants, createVariant } = require('../controllers/variantController');
const router = express.Router();


router.get('/', getVariants);
router.post('/', createVariant);

module.exports = router;