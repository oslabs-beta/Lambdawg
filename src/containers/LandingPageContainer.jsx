import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { VscZoomIn, VscBook, VscColorMode, VscMenu, VscKey, VscFileCode } from "react-icons/vsc";

const LandingPageContainer = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const mascot = "src/assets/logo.png";
  const video1 = "src/assets/mock-video1.gif";
  const mobilemap = "src/assets/mobile-map.png";
  const mobilelog = "src/assets/mobile-logs.png";
  const mobilemetrics = "src/assets/mobile-metrics.png";

  const screenshot = "src/assets/desktop.png";
  // our logo
  // a breif description
  // sign up button / read docs button
  // video presentation elements with descriptions
  // basically sell this shit on this page
  const redirectToAuth = () => {
    setShouldRedirect(false);
    // setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <div id="landing-page-container">
        <img src={mascot} className="landing-logo" />
        <p>An amazing app that blows socks off of seasoned developers.</p>
        <div className="button-flex-wrapper">
          <button id="get-started-button" className="primary-button" onClick={redirectToAuth}>
            Get Started
          </button>
        </div>

        <div id="landing-page-flex">
          <div className="info-card-wrapper">
            <div className="info-card">
              <h1>STUFF</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing
              world of our developer mindsAnother peek into the amazing world{" "}
            </div>
            <div className="info-card">
              <h1>ABOUT</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing
              world of our developer mindsAnother peek into the amazing world{" "}
            </div>
            <div className="info-card">
              <h1>THINGS</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing
              world of our developer mindsAnother peek into the amazing world{" "}
            </div>
          </div>

          <div className="info-card-wrapper">
            <img src={screenshot} className="screen-shot" />
            <img src={mobilemap} className="screen-shot-mobile" />
            <img src={mobilemetrics} className="screen-shot-mobile" />
            <img src={mobilelog} className="screen-shot-mobile" />
          </div>

          <p className="landing-card">
            Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our
            developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world
            of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the
            amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek
            into the amazing world of our developer mindsAnother peek into the amazing world of our developer
            mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our
            developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world
            of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the
            amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek
            into the amazing world of our developer minds
          </p>
        </div>
      </div>
    </div>
  );
};
export default LandingPageContainer;
