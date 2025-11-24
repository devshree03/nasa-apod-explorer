import React, { useState } from "react";

function ApodByDate() {
  const [date, setDate] = useState("");
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAPOD = () => {
    if (!date) return;
    setLoading(true);
    fetch(`http://127.0.0.1:8000/apod/date/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setApod(data);
        setLoading(false);
      })
      .catch((err) => {
        setApod(null);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>View APOD by Date</h2>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button onClick={fetchAPOD} disabled={loading || !date}>
        {loading ? "Loading..." : "Fetch"}
      </button>
      {apod && (
        <div>
          <h3>{apod.title}</h3>
          <img src={apod.url} alt={apod.title} style={{ maxWidth: "100%" }} />
          <p>{apod.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default ApodByDate;
