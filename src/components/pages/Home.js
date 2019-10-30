import React from "react";
import { Helmet } from "react-helmet";

import { APP_TITLE } from "constants/AppLanguage";

const Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <h1 className="title">{APP_TITLE}</h1>
      <div className="columns is-centered">
        <div className="column is-half"></div>
      </div>
    </React.Fragment>
  );
};

export default Home;
