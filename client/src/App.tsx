import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { RoomCards } from "./components/home/RoomCards";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="flex flex-col items-center justify-center content-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomCards/>}/>
      </Routes>
    </div>
  );
}

export default App;
