import React from "react";
import ApodToday from "./components/ApodToday";
import ApodByDate from "./components/ApodBydate";

function App() {
  return (
    <div className="App">
      <h1>NASA APOD Explorer</h1>
      <ApodToday />
      <hr />
      <ApodByDate />
    </div>
  );
}

export default App;
