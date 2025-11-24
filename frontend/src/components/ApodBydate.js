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
      .catch(() => {
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
        style={{ marginRight: "8px" }}
      />
      <button onClick={fetchAPOD} disabled={loading || !date}>
        {loading ? "Loading..." : "Fetch"}
      </button>

      {apod && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "18px"
          }}
        >
          <h3 style={{ fontWeight: 600, textAlign: "center" }}>{apod.title}</h3>
          <div style={{ display: "flex", justifyContent: "center", margin: "18px 0" }}>
            <img
              src={apod.url}
              alt={apod.title}
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 2px 8px #ddd"
              }}
            />
          </div>
          <p style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            {apod.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default ApodByDate;
