import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const MovingAverageApp = () => {
  const [timeSeries, setTimeSeries] = useState([
    { month: "Jan", value: 152 },
    { month: "Feb", value: 111 },
  ]);

  const [period, setPeriod] = useState(2);
  const [forecast, setForecast] = useState([]);

  const [newMonth, setNewMonth] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    // Memperbarui model regresi linear saat data berubah
    if (timeSeries.length >= period) {
      const result = [];
      let sum = 0;

      for (let i = 0; i < period; i++) {
        sum += timeSeries[i].value;
      }

      for (let i = 0; i < timeSeries.length; i++) {
        if (i >= period) {
          const movingAverage = sum / period;
          const sPrime = movingAverage + 2; // S'
          const sDoublePrime = movingAverage - 2; // S''
          const sTriplePrime = movingAverage + 3; // S'''
          const at = timeSeries[i].value - movingAverage; // at
          const bt = at / period; // bt
          const ct = movingAverage + bt; // ct
          const forecastValue = ct; // Hasil lamaran
          const ae = Math.abs(timeSeries[i].value - forecastValue); // AE (Absolute Error)
          const ape = (ae / timeSeries[i].value) * 100; // APE (Absolute Percentage Error)

          result.push({
            month: timeSeries[i].month,
            value: forecastValue.toFixed(2),
            sPrime: sPrime.toFixed(2),
            sDoublePrime: sDoublePrime.toFixed(2),
            sTriplePrime: sTriplePrime.toFixed(2),
            at: at.toFixed(2),
            bt: bt.toFixed(2),
            ct: ct.toFixed(2),
            forecastAE: ae.toFixed(2),
            forecastAPE: ape.toFixed(2),
          });

          // Memperbarui sum untuk perhitungan selanjutnya
          sum = sum - timeSeries[i - period].value + timeSeries[i].value;
        } else {
          result.push({
            month: timeSeries[i].month,
            value: timeSeries[i].value.toFixed(2),
            sPrime: '',
            sDoublePrime: '',
            sTriplePrime: '',
            at: '',
            bt: '',
            ct: '',
            forecastAE: '',
            forecastAPE: '',
          });
        }
      }

      setForecast(result);
    } else {
      setForecast([]);
    }
  }, [timeSeries, period]);

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
        label: `Moving Average (${period} periods)`,
        data: forecast.map((data) => data.value),
        fill: false,
        borderColor: "red",
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
        <h1 className="h1 text-center">Sistem Peramalan Moving Average</h1>

        <div className="border rounded p-3 mb-3">
          <h2>Input Data</h2>

          <div className="mb-3">
            <label className="form-label">Pilih Periode Moving Average</label>
            <input
              type="number"
              className="form-control"
              value={period}
              onChange={(e) => setPeriod(parseInt(e.target.value))}
            />
          </div>

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
          <h2>Hasil Peramalan Moving Average</h2>
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

        <h2>Grafik Time Series dan Moving Average</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MovingAverageApp;
