const router = require('express').Router();

// Import  modular routers 
const notesRouter = require('./notes');

// Import  diagnostics route

router.use('/notes', notesRouter);

// Initialize diagnostics route

module.exports = router;
