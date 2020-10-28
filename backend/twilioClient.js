var accountSid = ''
var authToken = ''
var sendingNumber = ''

createTwilioClient = () => {
  accountSid = process.env.CONTACT_PORTAL_TWILIO_ACCOUNT_SID
  authToken = process.env.CONTACT_PORTAL_TWILIO_AUTH_TOKEN

  return require('twilio')(accountSid, authToken)
}

module.exports.sendSms = function(to, message) {
  sendingNumber = process.env.CONTACT_PORTAL_TWILIO_SENDING_NUMBER

  return createTwilioClient().messages.create({
    body: message,
    to: to,
    from: sendingNumber
  })
}
