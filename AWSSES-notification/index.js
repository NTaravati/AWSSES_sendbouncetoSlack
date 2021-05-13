console.log("Loading SES message");
var slackToken    = 'xoxb-*************-*************-*************';           // SLACK TOKEN
var slackChannel  = '#error';                                                   // SLACK CHANNEL
var axios         = require('axios');                                           // IF NOT AVAILABLE, RUN npm install axios LOCALLY AND THEN UPLOAD TO AWS LAMBDA

exports.handler = function (event, context, callback) {
    console.log("Received event:", JSON.stringify(event, null, 2));
    sendToSlack(event, null, 2).catch(err => console.log(err));

    async function sendToSlack(event, context, callback) {
        var SESMessage = event.Records[0].Sns.Message;
        SESMessage = JSON.parse(SESMessage);
        var SESMessageType = SESMessage.notificationType;
        var SESDestinationAddress = SESMessage.mail.destination.toString();
        var SESSourceAddress = SESMessage.mail.source.toString();
        var SESbounceSummary = JSON.stringify(SESMessage.bounce.bouncedRecipients);
        var SESreportingMTA = SESMessage.bounce.reportingMTA;
        var url = 'https://slack.com/api/chat.postMessage';
        var text = SESSourceAddress + " resulted in a *" + SESMessageType.toLowerCase() + "* while sending a message to " + SESDestinationAddress + ". \`\`\`" + SESbounceSummary + '\n' + SESreportingMTA + ' \`\`\` ';
        var res = await axios.post(url, {
            channel: slackChannel,
            text,
            icon_emoji: ':envelope:'
        }, { headers: { authorization: `Bearer ${slackToken}` } });
        console.log('Done', res.data);
    }
};

// source: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-sns-ses-dynamodb/
// source: https://thecodebarbarian.com/working-with-the-slack-api-in-node-js.html