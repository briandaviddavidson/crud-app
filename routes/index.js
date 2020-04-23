var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing');

/* GET home page. */
router.get('/', landing.getLanding);
router.post('/', landing.submitLead);
router.get('/leads', landing.showLeads);
router.get('/lead/:leadId', landing.showLead);
router.get('/lead/:leadId/edit', landing.showEditLead);
router.post('/lead/:leadId/edit', landing.EditLead);
router.post('/lead/:leadId/delete', landing.deleteLead);
router.post('/lead/:leadId/delete-json', landing.deleteLeadJson);

module.exports = router;
