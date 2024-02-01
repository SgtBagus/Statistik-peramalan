import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import regression from "regression";

const LinearRegressionApp = () => {
  const [timeSeries, setTimeSeries] = useState([
    { month: "Jan", value: 10 },
    { month: "Feb", value: 12 },
    // Tambahkan data time series selanjutnya di sini
  ]);

  const [forecast, setForecast] = useState([]);
  const [regressionResult, setRegressionResult] = useState(null);

  const [newMonth, setNewMonth] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    // Memperbarui model regresi linear saat data berubah
    if (timeSeries.length >= 2) {
      const data = timeSeries.map((point) => [
        timeSeries.indexOf(point),
        point.value,
      ]);
      const result = regression.linear(data);
      setRegressionResult(result);
    }
  }, [timeSeries]);

  useEffect(() => {
    // Menghasilkan hasil peramalan berdasarkan model regresi
    if (regressionResult) {
      const result = [];
      for (let i = 0; i < timeSeries.length + 3; i++) {
        const forecastValue = regressionResult.predict(i)[1];
        const sPrime = forecastValue + 2; // S'
        const sDoublePrime = forecastValue - 2; // S''
        const sTriplePrime = forecastValue + 3; // S'''
        const at = timeSeries[i] ? timeSeries[i].value - forecastValue : ""; // at
        const bt = at !== "" ? at / 1 : ""; // bt (disesuaikan sesuai model regresi)
        const ct = at !== "" ? forecastValue + bt : ""; // ct
        const ae = at !== "" ? Math.abs(at) : ""; // AE (Absolute Error)
        const ape =
          ae !== "" && timeSeries[i].value !== 0
            ? (ae / timeSeries[i].value) * 100
            : ""; // APE (Absolute Percentage Error)

        result.push({
          month: timeSeries[i] ? timeSeries[i].month : "",
          value: forecastValue.toFixed(2),
          sPrime: sPrime.toFixed(2),
          sDoublePrime: sDoublePrime.toFixed(2),
          sTriplePrime: sTriplePrime.toFixed(2),
          at: at !== "" ? at.toFixed(2) : "",
          bt: bt !== "" ? bt.toFixed(2) : "",
          ct: ct !== "" ? ct.toFixed(2) : "",
          forecastAE: ae !== "" ? ae.toFixed(2) : "",
          forecastAPE: ape !== "" ? ape.toFixed(2) : "",
        });
      }
      setForecast(result);
    }
  }, [regressionResult, timeSeries]);

  const addDataPoint = () => {
    if (newMonth && newValue) {
      setTimeSeries([
        ...timeSeries,
        { month: newMonth, value: parseFloat(newValue) },
      ]);
      setNewMonth("");
      setNewValue("");
    } else {
      alert("Masukkan bulan dan nilai!");
    }
  };

  const chartData = {
    labels: timeSeries.map((data) => data.month),
    datasets: [
      {
        label: "Data Time Series",
        data: timeSeries.map((data) => data.value),
        fill: false,
        borderColor: "blue",
        type: "line",
      },
      {
        label: "Linear Regression Forecast",
        data: forecast.map((data) => data.value),
        fill: false,
        borderColor: "green",
        type: "line",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
      },
    },
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="h1 text-center">Sistem Peramalan Linear Regression</h1>

        <div className="border rounded p-3 mb-3">
          <h2>Input Data</h2>

          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Bulan</label>
                <input
                  type="text"
                  className="form-control"
                  value={newMonth}
                  onChange={(e) => setNewMonth(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nilai</label>
                <input
                  type="number"
                  className="form-control"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
            </div>
            <button
              className="form-control btn btn-primary my-2"
              onClick={addDataPoint}
            >
              Tambahkan
            </button>
          </div>
        </div>

        <div className="border rounded p-3 mb-3">
          <h2>Data Time Series</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              {timeSeries.map((data, index) => (
                <tr key={index}>
                  <td>{data.month}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border rounded p-3 mb-3">
          <h2>Hasil Peramalan Linear Regression</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Nilai Peramalan</th>
                <th>S'</th>
                <th>S''</th>
                <th>S'''</th>
                <th>at</th>
                <th>bt</th>
                <th>ct</th>
                <th>AE</th>
                <th>APE</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((data, index) => (
                <tr key={index}>
                  <td>{data.month}</td>
                  <td>{data.value}</td>
                  <td>{data.sPrime}</td>
                  <td>{data.sDoublePrime}</td>
                  <td>{data.sTriplePrime}</td>
                  <td>{data.at}</td>
                  <td>{data.bt}</td>
                  <td>{data.ct}</td>
                  <td>{data.forecastAE}</td>
                  <td>{data.forecastAPE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Grafik Time Series dan Linear Regression Forecast</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LinearRegressionApp;
