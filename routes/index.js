var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing');
let user = require('../controllers/user');
let {hasAuth} = require('../middleware/hasAuth.js');

// Login routes
router.get('/login', user.showLogin);
router.get('/signup', user.showSignup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);
// Sales pages
router.get('/', landing.getLanding);
router.post('/', landing.submitLead);
router.get('/leads', hasAuth, landing.showLeads);
router.get('/lead/:leadId', hasAuth, landing.showLead);
router.get('/lead/:leadId/edit', hasAuth, landing.showEditLead);
router.post('/lead/:leadId/edit', hasAuth, landing.EditLead);
router.post('/lead/:leadId/delete', hasAuth, landing.deleteLead);
router.post('/lead/:leadId/delete-json', hasAuth, landing.deleteLeadJson);

module.exports = router;
