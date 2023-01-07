import { Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import ReservationsTable from "./components/admin/ReservationsTable";
import Home from "./components/home/Home";
import NavbarDisplayer from "./components/navbar/NavbarDisplayer";
import { RoomCards } from "./components/home/RoomCards";
import NavBar from "../src/components/navbar/NavBar";
import { CreateRoom } from "./components/admin/CreateRoom";


function App() {
  return (
    <div className="flex flex-col items-center justify-center content-center">
      <NavbarDisplayer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/rooms" element={<RoomCards/>}/>
        <Route path="/createRoom" element={<CreateRoom/>}/>
      </Routes>
    </div>
  );
}

export default App;
