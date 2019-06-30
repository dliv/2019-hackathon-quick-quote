# Hackathon 2019 - Quick Quote

Hackathon project to reduce data entry needed during a quote.

Demo (WIP) at [https://d3sw2rxroe5co8.cloudfront.net/](https://d3sw2rxroe5co8.cloudfront.net/).
Test images for license and plates are [here](/test-data).

![Demo Gif](/docs/img/quick-quote-OCR.gif 'Demo Gif as of 2019-06-30')

Note: The deployed demo has an aggressively throttled api key.

## Services Diagram

![Services Diagram](/docs/img/services-diagram.png 'Services Diagram')

See:

- [AWS Textract](https://aws.amazon.com/textract/)
- [AWS Rekognition](https://aws.amazon.com/rekognition/)

## Developing

No CI/CD. To use the deployed api, ask for the api key and include it in your .env file. Otherwise, create a new AWS Api Gateway and deploy the [lambdas](/lambdas) there.

Front-end is Create React App plus TypeScript and UI components from Ant Design.
