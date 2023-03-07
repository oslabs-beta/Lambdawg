import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import LandingPageContainer from "./containers/LandingPageContainer.jsx";
import Auth from "./components/Auth.jsx";
import Docs from "./components/Docs.jsx";
import SettingsContainer from "./containers/SettingsContainer.jsx";
import Navbar from "./components/Navbar.jsx";

import "./styles/application.scss";

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const jwt = document.cookie;
    console.log("cookies??", jwt);
    // console.log('regex jwt??', document.cookie.match(/jwt=([^;]*)/))

    const checkAuth = async () => {
      if (jwt) {
        try {
          const response = await fetch("http://localhost:3000/api/", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            console.log("jwt fetch ok", data[0]);
            const { user_name, full_name, email, _id, arn, region } = data[0];
            setUser({
              full_name: full_name,
              user_name: user_name,
              email: email,
              _id: _id,
              arn: arn,
              region: region,
            });
            // console.log('user', user)
            setLoggedIn(true);
          } else {
            console.error("JWT app.jsx Unable to authenticate jwt");
          }
        } catch (error) {
          console.error("JWT app.jsx", error);
        }
      } else {
        console.log("jwt not found");
      }
    };
    checkAuth();
  }, []);

  // // check if they're logged in - if yes, setLoggedIn to true
  // useEffect(() => {
  //   const isUserAuthenticated = () => {
  //     // Check for a session cookie?
  //     return (loggedIn)? setLoggedIn(true) : setLoggedIn(false) // temp til cookies work
  //      // Return true or false depending on cookie
  //   };
  //   setLoggedIn(isUserAuthenticated());
  // }, []);

  return (
    <div className="router">
      <Navbar loggedIn={loggedIn} />
      <div className="routerMain" id="content">
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              loggedIn ? (
                <DashboardContainer loggedIn={loggedIn} user={user} />
              ) : (
                <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
              )
            }
          />
          <Route
            exact
            path="/settings"
            element={
              loggedIn ? (
                <SettingsContainer loggedIn={loggedIn} user={user} setUser={setUser} />
              ) : (
                <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
              )
            }
          />
          <Route
            exact
            path="/auth"
            element={
              loggedIn ? (
                <DashboardContainer loggedIn={loggedIn} user={user} />
              ) : (
                <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
              )
            }
          />
          <Route exact path="/docs" element={<Docs />} />
          <Route exact path="/" element={<LandingPageContainer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
