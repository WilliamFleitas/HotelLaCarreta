import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="flex flex-col items-center justify-center content-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
