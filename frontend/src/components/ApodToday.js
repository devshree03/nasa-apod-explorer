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
      .catch((err) => {
        console.error("Failed to fetch APOD:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!apod) return <p>No data available.</p>;

  return (
    <div>
      <h2>{apod.title}</h2>
      <img src={apod.url} alt={apod.title} style={{ maxWidth: "100%" }} />
      <p>{apod.explanation}</p>
    </div>
  );
}

export default ApodToday;
