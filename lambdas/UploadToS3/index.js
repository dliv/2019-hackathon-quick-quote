const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = 'dliv-hackathon-2019';

const path = (category, id, ext = 'jpg') => `uploads/${category}/${id}.${ext}`;

exports.handler = (event, context, callback) => {
  let body;
  if (typeof (event && event.body) === 'string') {
    // normal case, from outside
    console.log('appears to be from api gateway');
    body = JSON.parse(event.body);
  } else {
    // test event
    console.log('appears to be test event');
    body = event;
  }
  console.log('body: ', JSON.stringify(body, null, 2));
  const { img, category, id, ext } = body;
  const decodedImage = Buffer.from(img, 'base64');
  const filePath = path(category, id, ext);
  console.log('filePath: ', filePath);
  const s3params = {
    Body: decodedImage,
    Bucket: bucket,
    Key: filePath,
  };
  s3.upload(s3params, function(error, upload) {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers: {},
        body: JSON.stringify({
          body: body,
          error,
        }),
      });
    } else {
      console.info('upload', upload);
      callback(null, {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
          body: body,
          upload,
        }),
      });
    }
  });
};
