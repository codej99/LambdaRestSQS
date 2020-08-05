'use strict';

// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
const AWS = require('aws-sdk'); 
AWS.config.update({region: 'ap-northeast-2'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports.hello = (event, context, callback) => {

  const body = JSON.parse(event.body);
  console.info("Data Saved >>>> %s - %s - %s - %s",body.user_id, body.user_nick, body.contents_title, body.message);

  let params = {
    MessageBody: event.body,
    QueueUrl: "https://sqs.ap-northeast-2.amazonaws.com/478069740483/sampleQueue"
  };

  sqs.sendMessage(params).promise()
    .then((data) => {
      console.info("SQS Send Message Success", data.MessageId);
      const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
        ),
      };
      callback(null, response);
    })
    .catch((err) => {
      console.info("SQS Send Message Error", err);
      callback(err);
    })
};