## AWS SES 
###### receive Slack notifications every time a mail bounces

Each time an email send through AWS SES bounces, your reputation will be lowered. This script is made to prevent this from happening. Each time a mail bounces, you'll receive the following message in Slack:

## How does this script work?
1. Download this repository. 
2. Create a <a href="://thecodebarbarian.com/working-with-the-slack-api-in-node-js.html"Slack app (tutorial)</a> and enter the API key inside index.js. Don't forget to change the channel name as well. 
3.Follow <a href="://aws.amazon.com/premiumsupport/knowledge-center/lambda-sns-ses-dynamodb/">this tutorial</a> but ignore the DynamoDB part.  
4. Zip the folder "AWSSES-notification". Upload this .zip in your AWS Lambda function.
5. When completed, test if this script is working by visiting AWS SES > Domains > Send test mail (to: bounce@simulator.amazonses.com). You should now receive a Slack notification including all details.

Infrastructure overview:

```
AWS SES
| AWS SNS
| - AWS Lambda 
| - - Slack channel
```