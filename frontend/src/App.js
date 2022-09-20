import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhonebookBox from "./components/PhonebookBox";
import MapBox from "./components/MapBox";

//const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhonebookBox />} />
          <Route path="/map" element={<MapBox />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;