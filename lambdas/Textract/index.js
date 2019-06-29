const AWS = require('aws-sdk');
const textract = new AWS.Textract();

const bucket = 'dliv-hackathon';

const path = (category, id, ext = 'jpg') => `uploads/${category}/${id}.${ext}`;

exports.handler = (event, context, callback) => {
  let body;
  if (typeof (event && event.body) === 'string') {
    console.log('request appears to be from api gateway');
    body = JSON.parse(event.body);
  } else {
    console.log('request appears to be from Lambda console');
    body = event;
  }
  console.log('body: ', JSON.stringify(body, null, 2));
  const { img, category, id, ext } = body;

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Textract.html#detectDocumentText-property
  const textractParams = {
    Document: {
      ...(img
        ? {
            Bytes: Buffer.from(img, 'base64'),
          }
        : {
            S3Object: {
              Bucket: bucket,
              Name: path(category, id, ext),
              // Version: 'STRING_VALUE'
            },
          }),
    },
  };
  console.log('textractParams: ', JSON.stringify(textractParams, null, 2));
  textract.detectDocumentText(textractParams, function(error, extracted) {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        // something wrong with my CORS config, not being auto-added to response
        headers: {
          'access-control-allow-headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'access-control-allow-methods': 'OPTIONS,POST',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
          body: body,
          error,
        }),
      });
    } else {
      console.info('extracted', extracted);
      callback(null, {
        statusCode: 200,
        // something wrong with my CORS config, not being auto-added to response
        headers: {
          'access-control-allow-headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'access-control-allow-methods': 'OPTIONS,POST',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
          body: body,
          extracted,
        }),
      });
    }
  });
};
