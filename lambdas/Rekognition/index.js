const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

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
  console.log('body: ', JSON.stringify({ ...body, img: body.img ? '...' : undefined }, null, 2));
  const { img, category, id, ext } = body;

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Textract.html#detectDocumentText-property
  const params = {
    Image: {
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
  console.log(
    'params: ',
    JSON.stringify({ ...params.Image, Bytes: img ? '...' : undefined }, null, 2),
  );
  rekognition.detectText(params, function(error, extracted) {
    console.info('extracted', extracted);
    if (error) {
      console.error(error);
    }
    callback(null, {
      statusCode: error ? 500 : 200,
      headers: {
        'access-control-allow-headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'access-control-allow-methods': 'OPTIONS,POST',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({
        body: body,
        extracted,
        error,
      }),
    });
  });
};
