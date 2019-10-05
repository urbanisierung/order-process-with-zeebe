import React from "react";

import logo from "../assets/zeebe.jpg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="Zeebe logo" width="120" />
    <h1 className="mb-4">Welcome to the mighty zeebe shop!</h1>

    <p className="lead">
      This is a sample shop frontend to trigger a new workflow instance at <a href="https://camunda.io">Camunda Cloud</a>. If you have no account apply <a href="https://zeebe.io/cloud/">here</a>.
    </p>
    <p>
      For more information about this project take a look at the <a href="https://github.com/urbanisierung/order-process-with-zeebe">Github project</a>.
    </p>
  </div>
);

export default Hero;
