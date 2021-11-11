import React from "react";
import "normalize.css";
import "./Homepage.css";
import HomeNav from "../../components/HomeNav/HomeNav";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";
import requests from "../../config/requests/requests";

const Homepage = () => {


  return (
    <div className="homePage">
      <HomeNav />

      <Banner />
      <Row fetchUrl={requests.fetchTrending} />
    </div>
  );
};

export default Homepage;
