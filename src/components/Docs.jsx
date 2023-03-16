import React from 'react';
import logo from '../assets/logo.png';
import setup1 from '../assets/docs-gif-01.gif';
import setup2 from '../assets/docs-gif-02.gif';
import setup3 from '../assets/docs-gif-03.gif';
import signup from '../assets/signyouup.gif';
import arn from '../assets/enteryourarn.gif';
import stack from '../assets/getyourstack.gif';



const Docs = () => {
  return (
    <div id='docs-page'>
      <img src={logo} className='docs-logo' />
     
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
          <img src={signup} alt='Connect your AWS account' />
        </div>

        <div>
          <p>Copy and paste your ARN key</p>
          <img src={stack} alt='Locate your ARN key' />
        </div>

        <div>
          <p>Select your region</p>
          <img src={arn} alt='Select your region' />
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
