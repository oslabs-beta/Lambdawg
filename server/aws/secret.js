const creds = {
  key: "AKIAV4AYG6ELHMLOAZUQ",
  sKey: "r3F2uEuXaiUAt05WwFZAoKXcMPGAUTpFhQ7Ak1ap",
  // userARN: 'arn:aws:iam::403777712406:user/serverless',
  //ARN from stack permission :
  userARN: "arn:aws:iam::498545057811:role/LambdawgDelegationRole",
};
module.exports = creds;

// https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=lambdawg-permission&param_ExternalId=Lambdawg&templateURL=https://userhelper.s3.amazonaws.com/cloudFormation.yaml