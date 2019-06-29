Node instead of Python because the official boto client doesn't
have Textract yet and the docs want you to build a lambda layer
to work around that.

IAM (excessive):

- CloudWatchLogsFullAccess
- AmazonTextractFullAcess
