import React, { useState } from "react";

const DelphiForecastApp = () => {
  const [number, setNumber] = useState(0);

  const [expertOpinions, setExpertOpinions] = useState([]);
  const [forecast, setForecast] = useState(null);

  const addExpertOpinion = (value) => {
    setExpertOpinions([...expertOpinions, parseFloat(value)]);
  };

  const calculateForecast = () => {
    if (expertOpinions.length > 0) {
      const averageOpinion =
        expertOpinions.reduce((sum, opinion) => sum + opinion, 0) /
        expertOpinions.length;
      setForecast(averageOpinion);
    } else {
      alert("Tambahkan setidaknya satu pendapat ahli!");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="h1 text-center">Sistem Peramalan Metode Delphi</h1>

        <div className="border rounded p-3 mb-3">
          <h2>Tambahkan Pendapat Ahli</h2>

          <form>
            <div className="mb-3">
              <label className="form-label">Pendapat Ahli</label>
              <input
                type="number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                type="button"
                className="form-control btn btn-primary my-2"
                onClick={() => {
                  addExpertOpinion(number);
                  setNumber(0);
                }}
              >
                Tambah Angka
              </button>
            </div>

            <h5>Pendapat Ahli</h5>
            <ul>
              {expertOpinions.map((opinion, index) => (
                <li key={index}>
                  Ahli {index + 1}: {opinion}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="form-control btn btn-warning my-2"
              onClick={calculateForecast}
            >
              Hitung Peramalan
            </button>
          </form>
        </div>

        <h2>Langkah-langkah Perhitungan Delphi</h2>
        <ol>
          <li>Para ahli memberikan pendapat mereka tentang peramalan.</li>
          <li>Rata-rata dari semua pendapat dihitung.</li>
          <li>Hasil rata-rata digunakan sebagai peramalan.</li>
        </ol>

        <h2>Hasil Peramalan Delphi</h2>

        {forecast !== null ? (
          <b>Peramalan: {forecast.toFixed(2)}</b>
        ) : (
          <p>Belum ada hasil peramalan.</p>
        )}
      </div>
    </div>
  );
};

export default DelphiForecastApp;
