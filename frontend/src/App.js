import React from "react";
import ApodToday from "./components/ApodToday";
import ApodByDate from "./components/ApodByDate";
import ApodGallery from "./components/ApodGallery";

function App() {
  return (
    <div className="App">
      <div className="header-block">
        <h1>NASA APOD Explorer</h1>
        <p>View and explore NASA's Astronomy Picture of the Day. Enter any date to see cosmic wonders!</p>
      </div>
      <div className="apod-today-block">
        <ApodToday />
      </div>
      <hr />
      <ApodByDate />
      <hr />
      <ApodGallery days={7} />
    </div>
  );
}

export default App;
