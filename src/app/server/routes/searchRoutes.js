const express = require('express');
const router = express.Router();
const { listDatabases, createDatabase, getDatabase, updateDatabase, deleteDatabase } = require('../controllers/searchController');


router.get('/', listDatabases);
router.post('/create', createDatabase);
router.get('/:username', getDatabase);
router.put('/:username', updateDatabase);
router.delete('/:username', deleteDatabase);


module.exports = router;