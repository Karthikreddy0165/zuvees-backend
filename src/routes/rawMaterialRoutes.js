const express = require('express');
const { getRawMaterials, createRawMaterial } = require('../controllers/rawMaterialController');
const router = express.Router();


router.get('/', getRawMaterials);
router.post('/', createRawMaterial);

module.exports = router;