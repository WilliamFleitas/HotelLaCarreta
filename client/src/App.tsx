import { Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import Home from "./components/home/Home";
import NavbarDisplayer from "./components/navbar/NavbarDisplayer";
import { RoomCards } from "./components/home/RoomCards";
import { CreateRoom } from "./components/admin/CreateRoom";
import NavBar from "./components/navbar/NavBar";
import { RoomDetail } from "./components/home/RoomDetail/RoomDetail";
import { Gallery } from "./components/home/Gallery/Gallery";
import { AboutUs } from "./components/home/AboutUs";
import { Footer } from "./components/home/footer/Footer";
import { PaymentRoute } from "./components/home/check/PaymentRoute";
import { Login } from "./components/admin/Login";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserData } from "./redux/userSlice/userAction";

import Protected from "./components/admin/Protected";
import AOS from 'aos';
import 'aos/dist/aos.css';

  
function App() {
  const session = JSON.parse(
    window.localStorage.getItem("userSession") as string
  );

  const { username } = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
 
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (session) {
      dispatch(getUserData());
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center content-center">
      <NavbarDisplayer />
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/admin/login"
          element={username ? <Navigate to="/admin/dashboard" /> : <Login />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <Protected>
              <AdminPanel />
            </Protected>
          }
        />
        <Route path="/paymentroute" element={<PaymentRoute />} />
        <Route path="/rooms" element={<RoomCards />} />
        <Route path="/roomdetail/:id" element={<RoomDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route
          path="/admin/dashboard/createroom"
          element={
            <Protected>
              <CreateRoom />
            </Protected>
          }
        />

        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
