import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home";

import MovingAveraegApp from "./Components/MovingAverageApp";
import LinearRegressionApp from "./Components/LinearRegressionApp";
import DelphiForecastApp from "./Components/DelphiForecastApp";

function App() {
  Chart.register(CategoryScale);

  const renderCenter = (element) => (
    <div className="row">
      <div className="col-md-8 offset-md-2">{element}</div>
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={renderCenter(<Home />)}
      />
      <Route
        path="/MovingAverageApp"
        element={renderCenter(<MovingAveraegApp />)}
      />
      <Route
        path="/LinearRegressionApp"
        element={renderCenter(<LinearRegressionApp />)}
      />
      <Route
        path="/DelphiForecastApp"
        element={renderCenter(<DelphiForecastApp />)}
      />
    </Routes>
  );
}

export default App;
