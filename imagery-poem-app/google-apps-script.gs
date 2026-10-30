function doPost(e) {
  var message = String((e.parameter && e.parameter.message) || '').trim().slice(0, 3000);
  var images = String((e.parameter && e.parameter.images) || '').trim().slice(0, 500);
  var honeypot = String((e.parameter && e.parameter.website) || '').trim();
  if (honeypot || !message) return ContentService.createTextOutput('Request ignored.');

  var recipient = Session.getEffectiveUser().getEmail();
  var body = [
    'Someone requested a Jamie-written poem.', '',
    'Selected images:', images || 'None specified', '',
    'Their message:', message, '',
    'Submitted: ' + new Date().toISOString()
  ].join('\n');

  MailApp.sendEmail({
    to: recipient,
    subject: 'A request for a Jamie-written poem',
    body: body,
    name: 'Jamie Poetry Website'
  });
  return ContentService.createTextOutput('Your request was sent to Jamie.');
}
