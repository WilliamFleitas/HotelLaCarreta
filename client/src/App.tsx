import { Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import ReservationsTable from "./components/admin/ReservationsTable";
import Home from "./components/home/Home";
import NavbarDisplayer from "./components/navbar/NavbarDisplayer";

function App() {
  return (
    <div className="flex flex-col items-center justify-center content-center">
      <NavbarDisplayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
