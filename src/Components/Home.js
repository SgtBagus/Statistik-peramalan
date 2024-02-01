import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handelNavigate = (path) => {
    return navigate(path);
  };

  return (
    <ul class="list-group m-3">
      <li class="list-group-item list-group-item-action" onClick={() => handelNavigate('/MovingAverageApp')}>Moving Average</li>
      <li class="list-group-item list-group-item-action" onClick={() => handelNavigate('/LinearRegressionApp')}>Linear Regression</li>
      <li class="list-group-item list-group-item-action" onClick={() => handelNavigate('/DelphiForecastApp')}>Delphi Forecast</li>
    </ul>
  );
};

export default Home;
