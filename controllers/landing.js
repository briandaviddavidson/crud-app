const models = require('../models');

exports.getLanding = function(req, res, next) {
  res.render('landing', { title: 'Express' });
};

exports.submitLead = function(req, res, next) {
  return models.Lead.create({
    email: req.body.leadEmail
  }).then(lead => {
    res.redirect('/leads')
  })
};

exports.showLeads = function(req, res, next) {
  return models.Lead.findAll().then(leads => {
    res.render('landing', {title: 'Express', leads: leads});
  })
};

exports.showLead = function(req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.leadId
    }
  }).then(lead => {
    res.render('lead', {lead: lead});
  })
};
