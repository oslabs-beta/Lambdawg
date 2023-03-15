import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const LandingPageContainer = (props) => {
  const mascot = 'src/assets/logo.png';
  const video1 = 'src/assets/mock-video1.gif';
  const mobilemap = 'src/assets/mobile-map.png';
  const mobilelog = 'src/assets/mobile-logs.png';
  const mobilemetrics = 'src/assets/mobile-metrics.png';
  const screenshot = 'src/assets/desktop.png';

  return (
    <div>
      <div id='landing-page-container'>
        <img src={mascot} className='landing-logo' />
        <p>
          An easy visualization tool to manage your AWS Lambda functions more
          effectively
        </p>
        <div className='button-flex-wrapper'>
          <Link to={'/auth'}>
            <button id='get-started-button' className='primary-button'>
              Get Started
            </button>
          </Link>
        </div>

        <div id='landing-page-flex'>
          <div className='info-card-wrapper'>
            <div className='info-card'>
              <h1>EASY</h1>Connect your AWS account to Lambdawg in just a few
              clicks using our custom stack. Follow our detailed instructions
              and visualize your data in mere minutes. That's the Lambdawg way!{' '}
            </div>
            <div className='info-card'>
              <h1>OPEN</h1>Lambdawg is fully open source ! If you want to
              contribute or just report issues, go to the Lambdawg GitHub
              repository:{' '}
              <a href='https://github.com/oslabs-beta/Lambdawg'>
                https://github.com/oslabs-beta/Lambdawg
              </a>{' '}
            </div>
            <div className='info-card'>
              <h1>AWESOME</h1>Lambdawg was created to save Software Engineers
              time when trying to analyse the activity of their Lambda
              Functions. It displays data visualization, logs and errors in one
              dashboard{' '}
            </div>
          </div>

          <div className='info-card-wrapper'>
            <img src={screenshot} className='screen-shot' />
            <img src={mobilemap} className='screen-shot-mobile' />
            <img src={mobilemetrics} className='screen-shot-mobile' />
            <img src={mobilelog} className='screen-shot-mobile' />
          </div>

          <h3>Lambdawg in a few words</h3>
          <p className='landing-card'>
            AWS Lambda functions are central in AWS based architectures.
            However, as one's Lambda architecture becomes more complex,
            monitoring them can become time consuming and outright frustrating.
            <br />
            <br />
            Lambdawg proposes a solution to this problem by offering an
            open-source, easy to use Dashboard for monitoring your Lambda
            functions. <br />
            Lambdawg pulls Metrics and Logs from Cloudwatch as well as traces
            from AWS XRAY to provide comprehensive charts for direct comparison
            of functions. A much better way to monitor your Lambdas! <br />
            <br />
            <b>Lambdawg makes herding your 'Lambs' much easy.</b>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LandingPageContainer;
