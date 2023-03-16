## Lambdawg

<!--
*** This ReadMe used the template from https://github.com/othneildrew/Best-README-Template as an inspiration
-->

<a name='readme-top'></a>

<div align='center'>
<img src="https://github.com/oslabs-beta/Lambdawg/blob/dev/src/assets/logo.png?raw=true" height ="350px" width="350px" align="center">
  </a>
<h1>Lambdawg Users's Guide</h1>

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#about-lambdawg">About LAMBDAWG</a></li> 
      <li><a href="#initial-setup">Initial Setup</a></li>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#monitoring-features">Monitoring Features</a></li>
      <li><a href="#contributing">Contributing</a></li>      
      <li><a href="#built-with">Built With</a></li>
      <li><a href="#license">License</a></li>
      <li><a href="#authors">Authors</a></li>         
  </ol>
</details>

## About LAMBDAWG

<p>Easy access and straightforward, intuitive visualization of AWS Lambda functions and metrics are critical to AWS developers. The AWS documentaion is a hard hurdle to get over without any help.  We feel that using our tool in conjunction with said docs will help allieviate the stresses of not knowing.  Being able to quickly visualize how these Lambda Functions correlate within your app, having a log of your errors collected all in one space, will speed your development process. </p>

<ol>
<h1>What LAMBDAWG can get you</h1>
<li>Keeping an organized list of Error Logs Across AWS Lambda Functions all in one place</li>
<li>Allowing you to see the number of Invocations </li>
<li>"Duration": duration of the function execution in seconds.</li>
<li>"ResponseTime": time taken to generate the response in seconds.</li>
</ol>
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Initial Setup

Before getting into this, make sure to checkout the [Developer Setup Guide](https://github.com/oslabs-beta/Lambdawg/blob/dev/README-DeveloperGuide.md)

<p>Once you're finished there, fork this repo to your local network</p>
<p>You will want to create an .env</p>
<p>Inside the .env use the following snippet, but filling in with your private information</p>

```
# Enter your PostgreSQL URI here
PG_URI = ****************

# Credentials
_KEY = ****************
_SKEY = ****************
USER_ARN = ****************

# JWT Secret
#To get a random secret go to a new terminal and run node, and once you're running node enter the line below to get a random string
#require('crypto').randomBytes(64).toString('hex')

ACCESS_SECRET_TOKEN = ****************

REFRESH_SECRET_TOKEN = ****************

# Random number to assign a new column in our database instead of
#something predicatable like 'test', a 20 char string is fine

export TEST_TOKEN = ****************

```

<p>Next you want to install the dependencies via the command line in your directory</p>

```
npm install
```

<p>Open a new terminal, here you are going to want to spin up your Redis Server by entering the following in the command line</p>

```
redis-server
```

<p>And now, the moment you've been waiting for, go back to your initial terminal and in the command line</p>

```
npm run start
```

<p>Congratulations!  You're ready to start using LAMBDAWG!</p>
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Getting Started

<p>Existing User?  You can log in using your email and password.</p>

<p>For new users, click "Sign Up"</p>

<p>Fill in the form and click "Sign Up" again</p>

<p>This will redirect you to the settings page, follow the prompts and enter the required information</p>

<ol>
<h1>Simply follow the prompts that have been setup for you</h1>
<li>Connect to your AWS account and Copy your ARN</li>

<img src="https://github.com/oslabs-beta/Lambdawg/blob/dev/src/assets/docs-gif-01.gif?raw=true" height ="250px">
<li>Paste your ARN in the form</li>
<li>Select your region</li>
<li>Re-Enter your LAMBDAWG password</li>
<img src="https://github.com/oslabs-beta/Lambdawg/blob/dev/src/assets/docs-gif-03.gif?raw=true" height ="250px">
<p>Now you're ready to get your metrics!</p>
</ol>

<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Monitoring Features

<p>Once you're signed in, you can see all of the metrics right in one place.  You'll be able to click through the different functions and toggle their logs on and off.  All of the data that was pulled from AWS will be presented in clear readable graphs.</p>
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Contributing

<p>So you have a great idea that you want to contribute to LAMBDAWG?  
Or maybe you found one of those pesky bugs, and have a solution for it.  
Then let's get to it!  
Just fork the repo and create a pull request.  We look forward to hearing from the community!
Don't forget to throw a ⭐️ up for LAMBDAWG, and tell your friends!</p>

<ul>
<li><b>Fork LAMBDAWG</b></li>
<li><b>Clone to your Local Machine</b></li>
<li>git clone <\your_repo_url\></li>
<li><b>Create your Feature Branch</b></li>
<li>git checkout -b your/amazingFeature</li>
<li><b>Commit your changes</b></li>
<li>git commit -m "Quick comment about your amazing feature"</li>
<li><b>Push to the Branch</b/</li>
<li>git push origin your/amazingFeature</li>
<li><b>Open A Pull Request</b></li>
</ul>
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Built With

<p>Some of the great Technologies that we used in this app are listed below!</p>

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [D3](https://d3js.org/)
- [Chart.js](https://www.chartjs.org/)
- [Redis](https://redis.com/)
- [Jest](https://jestjs.io/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [AWS IAM](https://aws.amazon.com/iam/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS Elasticache](https://aws.amazon.com/elasticache/)
- [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/)
- [AWS STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html)
- [AWS Could Formation](https://docs.aws.amazon.com/cloudformation/index.html)
- [Javascript](https://www.javascript.com/)
- [HTML](https://html.com/)
- [Sass](https://sass-lang.com/)
- [Babel](https://babeljs.io/)
- [BCrypt](https://bcrypt.online/)
- [Validator](https://www.npmjs.com/package/validator)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Client XRay](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-xray/index.html)
- [Docker](https://www.docker.com/)
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## License

<p>Distributed under the MIT License</p>
<p align="right">(<a href="#lambdawg">back to top</a>)</p>

## Authors

- Chanda Gonet - [LinkedIn](https://www.linkedin.com/in/chanda-gonet-317b91237/)|[Github](https://github.com/Chanduh)
- Erica Park - [LinkedIn](https://www.linkedin.com/in/erica-s-park/)|[Github](https://github.com/EPsparky)
- Vincent Jacquemin - [LinkedIn](https://www.linkedin.com/in/vincentjacquemin/)|[Github](https://github.com/GIjack2001)
- Ted Gusek - [LinkedIn](https://www.linkedin.com/in/tedgusek/)|[Github](https://github.com/tedgusek)

<p align="right">(<a href="#lambdawg">back to top</a>)</p>
