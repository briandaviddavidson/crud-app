exports.getLanding = function(req, res, next) {
  res.render('landing', { title: 'Express' });
};

exports.submitLead = function(req, res, next) {
  console.log(`lead email: ${req.body.leadEmail}`)
  res.redirect('/')
};
