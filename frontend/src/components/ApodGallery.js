import React, { useState, useEffect } from "react";

function ApodGallery({ days = 7 }) {
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/apod/recent?days=${days}`)
      .then(res => res.json())
      .then(data => {
        setApods(data);
        setLoading(false);
      });
  }, [days]);

  if (loading) return <p>Loading gallery...</p>;
  if (apods.length === 0) return <p>No results found.</p>;

  return (
    <div>
      <h2>Gallery: Last {days} Days</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px 16px",
          justifyContent: "center",
        }}
      >
        {apods.map((apod, idx) => (
          <div
            key={apod.date || idx}
            style={{
              width: "260px",
              background: "#f8fafc",
              borderRadius: "10px",
              padding: "14px",
              boxShadow: "0 2px 8px #eee",
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img src={apod.url} alt={apod.title} style={{ width: "100%", borderRadius: "5px" }} />
            <h4 style={{ margin: "10px 0 4px 0", fontSize: "1.08em", textAlign: "center", fontWeight: "bold" }}>
              {apod.title}
            </h4>
            <p style={{ fontSize: "0.95em", color: "#1976d2", margin: 0 }}>{apod.date}</p>
            <p style={{ fontSize: "0.97em", color: "#505050", margin: "10px 0 0 0" }}>
              {apod.explanation.length > 90 ? apod.explanation.substr(0, 90) + "..." : apod.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApodGallery;
