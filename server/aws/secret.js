const creds = {
  key: 'AKIA3WG26GRSDUFX6ENS',
  sKey: 'pb8kT/2BkjzkU/4qohPWy/IqXStsRktvS7noJziv',
  //userARN: 'arn:aws:iam::403777712406:user/serverless',
  //ARN from stack permission :
  userARN:
    'arn:aws:cloudformation:us-east-1:403777712406:stack/lambdwag-permission/6cf754b0-b399-11ed-8825-0ecc2da87269',
};

module.exports = creds;

// https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=lambdwag-permission&param_ExternalId=Lambdawg&templateURL=https://userhelper.s3.amazonaws.com/cloudFormation.yaml
