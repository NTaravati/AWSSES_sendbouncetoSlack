## AWS SES send Slack notification upon bounce
Each time an email send through AWS SES bounces, your reputation will be lowered. This script is made to prevent this from happening. Each time a mail bounces, you'll receive the following message in Slack:

## How does this script work?
1. Download this repository. 
2. Create a <a href="https://thecodebarbarian.com/working-with-the-slack-api-in-node-js.html">Slack app (tutorial)</a> and enter the API key inside "./AWSSES-notification/index.js". Don't forget to change the channel name as well.
3. If your Slack channel is set to private, don't forget to add your app to that Slack channel as well. You <a href="https://stackoverflow.com/a/61637506">find this</a> under the Channel Details >> More >> Add Apps.
4. Follow <a href="https://aws.amazon.com/premiumsupport/knowledge-center/lambda-sns-ses-dynamodb/">this tutorial</a> but ignore the DynamoDB part.  
5. Zip the folder "AWSSES-notification". Upload this .zip in your AWS Lambda function.
6. When completed, test if this script is working by visiting AWS SES > Domains > Send test mail (to: bounce@simulator.amazonses.com). You should now receive a Slack notification including all details.

Infrastructure overview:

```
AWS SES
| AWS SNS
| - AWS Lambda 
| - - Slack channel
```