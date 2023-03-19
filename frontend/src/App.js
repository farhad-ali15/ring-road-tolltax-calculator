import "./App.css";
// import TollCollectionSystem from "./components/TollCollectionSystem";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import TollCollectionSystem from "./components/TollCollectionSystem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:id?" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
