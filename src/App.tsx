import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FullLayout from "./layouts/full";
import CornerLogo from "./components/cornerLogo";
import DonationBar from "./components/donationBar";

import STYLES from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={STYLES.App}>
      <Router>
        <Route path="/" exact component={FullLayout} />
        <Route path="/logo/" component={CornerLogo} />
        <Route path="/donations/" component={DonationBar} />
      </Router>
    </div>
  );
};

export default App;
