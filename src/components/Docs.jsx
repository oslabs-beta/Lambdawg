import React from 'react';
import titleLogo from '../assets/logo-text.png';
import setup1 from '../assets/docs-gif-01.gif';
import setup2 from '../assets/docs-gif-02.gif';
import setup3 from '../assets/docs-gif-03.gif';
const Docs = () => {
  return (
    <div id='docs-page'>
      <img src={titleLogo} className='docs-logo' />
      <h1>T H E * D O C S</h1>

      <h2>What it do baby ?</h2>
      <p className='docs-first-line'>
        Lambdawg is your go-to AWS Lambda Function visualization UI.
      </p>
      <p>
        Simply connect your AWS account in the Settings page above, and boom
        boom bam - you'll get your trace, metrics, and log data in one simple,
        streamlined interface.
      </p>

      <h2>Set up & Installation</h2>
      <section className='docs-setup-section'>
        <div>
          <p>Connect to your AWS account</p>
          <img src={setup1} alt='Connect your AWS account' />
        </div>
        <div>
          <p>Copy and paste your ARN key</p>
          <img src={setup2} alt='Locate your ARN key' />
        </div>
        <div>
          <p>Select your region</p>
          <img src={setup3} alt='Select your region' />
        </div>
      </section>

      <h4 className='docs-dev'>
        <span>
          Check us out on{' '}
          <a href='https://github.com/oslabs-beta/Lambdawg'>Github</a>!
        </span>
      </h4>

      <p className='docs-dev'>
        And if you're a developer...{' '}
        <span>
          <a href='https://github.com/oslabs-beta/Lambdawg'>click here</a> to
          learn more about Lambdawg!
        </span>
      </p>
    </div>
  );
};

export default Docs;
