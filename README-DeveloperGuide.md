<!--
*** This ReadMe used the template from https://github.com/othneildrew/Best-README-Template as an inspiration
-->

<a name='readme-top'></a>

<div align='center'>
<img src="https://github.com/oslabs-beta/Lambdawg/blob/dev/src/assets/logo.png?raw=true" height ="350px" width="350px" align="center">
  </a>
<h1>Lambdawg Developer's Guide</h1>

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#aws-account-creation">AWS Account Creation</a></li> 
      <li><a href="#iam-setup">IAM Setup</a></li>      
      <li><a href="#streamlining-the-user-sign-up-experience">Streamlining the User Sign-Up Experience</a></li>
        <li><a href="#yaml-template">YAML Template</a></li>      
        <li><a href="#template-storage-in-an-s3-bucket">Template Storage in an S3 Bucket</a></li>
        <li><a href="#stack-creation-link">Stack Creation Link</a></li>
        <li><a href="#finish-setup">Finish Setup</a></li>         
  </ol>
</details>

## AWS Account Creation

<p>Lambdawg uses the AWS-SDK to pull data from a user's AWS Lambda functions in order to render trace and metrics data on the Lambdawg UI. It is highly encouraged to create a new AWS account specific to Lambdawg to make full use of the app's features. </p>

## IAM Setup

<p>Once you have created an AWS root account, you will need to set up an IAM role with the required permissions to access users' AWS data.</p>

<p>On your AWS account, do the following:</p>

<p>1. Create an IAM user called lambdawg-user with programmatic access (not console access, as there is no need for users to access the AWS console)</p>

<p>2. Attach the following policies directly to lambdawg-user:</p>

<ul>
  <li>AdministratorAccess</li>
  <li>AmazonEC2FullAccess</li>
  <li>AmazonS3FullAccessAWS</li>
  <li>AWSLambda_FullAccess</li>
  <li>AWSLambdaRole</li>
  <li>AWSSecurityHubFullAccess</li>
  <li>CloudWatchFullAccess</li>
  <li>CloudWatchLogsFullAccess</li>
</ul>

<p>3. Create an access key secret access key for lambdawg-user. This will be stored in a .env file in the Lambdawg application.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Streamlining the User Sign-Up Experience

<p>From the Lambdawg landing page, users can navigate to Settings for a streamlined sign-up experience. The user will first connect to their AWS account by logging into AWS Cloudformation using the link provided. This will initialize a Cloudformation Stack that will create IAM resources for the user to access Lambdawg's services and provide Lambdawg the necessary permissions. Once the stack is created, users can navigate to the "Resources" tab to access their ARN key. Finally, users will simply paste their ARN key and region to access their metrics on the Lambdawg UI. </p>

## YAML Template

<p>As a developer, you will need to create a yaml file to allow users access to Lambdawg's UI. This file will allow CloudFormation to automate the creation of an IAM role upon user sign-up. The yaml file content should look like the example below. (<b>replacing the Principal / AWS ARN with the lambdawg-user’s ARN & replacing the sts:External Id with a secure external ID. You can use a generator such as UUID https://www.uuidgenerator.net/ for this step.</b>:</p>

<details>
  
```
Description: "CloudFormation stack"

Resources:
LambdawgDelegationRole:
Type: "AWS::IAM::Role"
Properties:
AssumeRolePolicyDocument:
Version: 2012-10-17
Statement: - Effect: Allow
Principal:
AWS: - arn:aws:iam::403777712406:user/lambdawg-user
Action: - "sts:AssumeRole"
Condition:
StringEquals:
"sts:ExternalId": !Ref ExternalId
Path: /
RoleName: LambdawgDelegationRole
Policies: - PolicyName: Resources
PolicyDocument:
Version: 2012-10-17
Statement: - Effect: Allow
Action: "apigateway:GET"
Resource: "_" - Effect: Allow
Action: "apigateway:HEAD"
Resource: "_" - Effect: Allow
Action: "apigateway:OPTIONS"
Resource: "_" - Effect: Allow
Action: "appsync:get_"
Resource: "_" - Effect: Allow
Action: "appsync:list_"
Resource: "_" - Effect: Allow
Action: "athena:list_"
Resource: "_" - Effect: Allow
Action: "athena:batchGet_"
Resource: "_" - Effect: Allow
Action: "athena:getNamedQuery"
Resource: "_" - Effect: Allow
Action: "athena:getQueryExecution"
Resource: "_" - Effect: Allow
Action: "athena:getQueryExecution"
Resource: "_" - Effect: Allow
Action: "autoscaling:describe*"
Resource: "*" - Effect: Allow
Action: "batch:describe*"
Resource: "*" - Effect: Allow
Action: "cloudformation:describe*"
Resource: "*" - Effect: Allow
Action: "cloudformation:get*"
Resource: "*" - Effect: Allow
Action: "cloudformation:list*"
Resource: "*" - Effect: Allow
Action: "cloudfront:get*"
Resource: "*" - Effect: Allow
Action: "cloudfront:list*"
Resource: "*" - Effect: Allow
Action: "cloudwatch:describe*"
Resource: "*" - Effect: Allow
Action: "cloudwatch:list*"
Resource: "*" - Effect: Allow
Action: "dax:describe*"
Resource: "*" - Effect: Allow
Action: "dax:list*"
Resource: "*" - Effect: Allow
Action: "discovery:describe*"
Resource: "*" - Effect: Allow
Action: "discovery:list*"
Resource: "*" - Effect: Allow
Action: "dynamodb:describe*"
Resource: "*" - Effect: Allow
Action: "dynamodb:list*"
Resource: "*" - Effect: Allow
Action: "ec2:describe*"
Resource: "*" - Effect: Allow
Action: "ecs:describe*"
Resource: "*" - Effect: Allow
Action: "ecs:list*"
Resource: "*" - Effect: Allow
Action: "ecr:describe*"
Resource: "*" - Effect: Allow
Action: "ecr:get*"
Resource: "*" - Effect: Allow
Action: "ecr:list*"
Resource: "*" - Effect: Allow
Action: "eks:describe*"
Resource: "*" - Effect: Allow
Action: "eks:list*"
Resource: "*" - Effect: Allow
Action: "elasticache:describe*"
Resource: "*" - Effect: Allow
Action: "elasticache:list*"
Resource: "*" - Effect: Allow
Action: "elasticloadbalancing:describe*"
Resource: "*" - Effect: Allow
Action: "es:describe*"
Resource: "*" - Effect: Allow
Action: "es:list*"
Resource: "*" - Effect: Allow
Action: "events:describe*"
Resource: "*" - Effect: Allow
Action: "events:list*"
Resource: "*" - Effect: Allow
Action: "firehose:describe*"
Resource: "*" - Effect: Allow
Action: "firehose:list*"
Resource: "*" - Effect: Allow
Action: "glacier:describe*"
Resource: "*" - Effect: Allow
Action: "glacier:getDataRetrievalPolicy"
Resource: "_" - Effect: Allow
Action: "glacier:getVaultAccessPolicy"
Resource: "_" - Effect: Allow
Action: "glacier:getVaultLock"
Resource: "_" - Effect: Allow
Action: "glacier:getVaultNotifications"
Resource: "_" - Effect: Allow
Action: "glacier:listTagsForVault"
Resource: "_" - Effect: Allow
Action: "glacier:listVaults"
Resource: "_" - Effect: Allow
Action: "iot:describe*"
Resource: "*" - Effect: Allow
Action: "iot:get*"
Resource: "*" - Effect: Allow
Action: "iot:list*"
Resource: "*" - Effect: Allow
Action: "kinesis:describe*"
Resource: "*" - Effect: Allow
Action: "kinesis:list*"
Resource: "*" - Effect: Allow
Action: "kinesisanalytics:describe*"
Resource: "*" - Effect: Allow
Action: "kinesisanalytics:list*"
Resource: "*" - Effect: Allow
Action: "lambda:listFunctions"
Resource: "_" - Effect: Allow
Action: "lambda:listTags"
Resource: "_" - Effect: Allow
Action: "rds:describe*"
Resource: "*" - Effect: Allow
Action: "rds:list*"
Resource: "*" - Effect: Allow
Action: "route53:list*"
Resource: "*" - Effect: Allow
Action: "route53:get*"
Resource: "*" - Effect: Allow
Action: "s3:getBucket*"
Resource: "*" - Effect: Allow
Action: "s3:list*"
Resource: "*" - Effect: Allow
Action: "sdb:domainMetadata"
Resource: "_" - Effect: Allow
Action: "sdb:get_"
Resource: "_" - Effect: Allow
Action: "sdb:list_"
Resource: "_" - Effect: Allow
Action: "sns:get_"
Resource: "_" - Effect: Allow
Action: "sns:list_"
Resource: "_" - Effect: Allow
Action: "sqs:get_"
Resource: "_" - Effect: Allow
Action: "sqs:list_"
Resource: "_" - Effect: Allow
Action: "states:describe_"
Resource: "_" - Effect: Allow
Action: "states:get_"
Resource: "_" - Effect: Allow
Action: "states:list_"
Resource: "_" - Effect: Allow
Action: "tag:get_"
Resource: "_" - PolicyName: Logs
PolicyDocument:
Version: 2012-10-17
Statement: - Effect: Allow
Action: "logs:deleteSubscriptionFilter"
Resource: "_" - Effect: Allow
Action: "logs:describeLogStreams"
Resource: "_" - Effect: Allow
Action: "logs:describeSubscriptionFilters"
Resource: "_" - Effect: Allow
Action: "logs:filterLogEvents"
Resource: "_" - Effect: Allow
Action: "logs:putSubscriptionFilter"
Resource: "_" - Effect: Allow
Action: "logs:startQuery"
Resource: "_" - Effect: Allow
Action: "logs:stopQuery"
Resource: "_" - PolicyName: Metrics
PolicyDocument:
Version: 2012-10-17
Statement: - Effect: Allow
Action: "cloudwatch:get*"
Resource: "*" - PolicyName: Traces
PolicyDocument:
Version: 2012-10-17
Statement: - Effect: Allow
Action: "xray:batch*"
Resource: "*" - Effect: Allow
Action: "xray:get*"
Resource: "*"
Parameters:
ExternalId:
Description: "The external ID for the LAMBDAWG delegation role"
Type: String

Outputs:
Version:
Description: LAMBDAWG CF template version
Value: 2020-02-06
LambdawgDelegationRoleArn:
Description: "The ARN for the LAMBDAWG delegation role"
Value: !GetAtt - LambdawgDelegationRole - Arn

```

</details>


## Template Storage in an S3 Bucket

<p>The template must be stored on your Lambdawg-specific AWS account.  The simplest way to do this is to create an S3 bucket and upload the template yaml file with the following steps:</p>

<ol>
  <li>Navigate to the AWS S3.</li>
  <li>Select Create Bucket.</li>
  <li>Name the bucket "lambdawg".</li>
  <li>Unselect "Block all public access".</li>
  <li>Create bucket.</li>
  <li>Add to bucket policy the text below step 8.</li>
  <li>Click upload and upload your created yaml file template.</li>
  <li>In the list of objects in your S3 bucket, copy the URL of your lambdawg template.</li>
 </ol>

```

{
"Version": "2008-10-17",
"Statement": [
{
"Sid": "AllowPublicRead",
"Effect": "Allow",
"Principal": {
"AWS": "*"
},
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::lambdawg/*"
}
]
}

```

## Stack Creation Link:
<p>Use the following link to allow your user to automatically create a stack. This link can be attached to the “Connect your AWS account” link on the Settings Page (in SettingsForm.jsx - line 71). Add in your template URL, region, and external id into the link to ensure the stack is properly configured.</p>

```

https://console.aws.amazon.com/cloudformation/home?region=<YOUR-REGION>#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=<YOUR-EXTERNALID>&templateURL=<YOUR-TEMPLATE-S3-URL>

```

## Finish Setup:

Continue following the main [README](https://github.com/oslabs-beta/lambdawg/blob/dev/README.md).
```
