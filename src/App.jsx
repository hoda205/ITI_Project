import { Route, Routes } from "react-router-dom";

import ServiceDetails from "./pages/ServiceDetails";
import BookingPage from "./pages/BookingPage";
import QueueTrackerPage from "./pages/QueueTrackerPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<HomePage />} />

        <Route path="/services" element={<ServicesPage />} />

        <Route path="/services/:id" element={<ServiceDetails />} />

        <Route path="/book" element={<BookingPage />} />

        <Route path="/queue" element={<QueueTrackerPage />} />

        <Route path="/my-bookings" element={<MyBookingsPage />} />

      </Route>

      <Route path="/login" element={<LoginPage />} />

    </Routes>
  );
}

export default App;