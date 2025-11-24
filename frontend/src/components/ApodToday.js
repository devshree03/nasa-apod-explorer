import React, { useState, useEffect } from "react";

function ApodToday() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/apod/today")
      .then((res) => res.json())
      .then((data) => {
        setApod(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!apod) return <p>No data available.</p>;

  return (
    <div>
      {/* Title left-aligned */}
      <h2 style={{ textAlign: "left", marginLeft: "0", fontWeight: 700 }}>
        {apod.title}
      </h2>
      {/* Image and text remain centered */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
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
  );
}

export default ApodToday;

