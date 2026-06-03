import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import EvaluationForm from "./pages/EvaluationForm";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Responses from "./pages/Responses";
import ByEvent from "./pages/ByEvent";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <main className="px-4 py-6 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/evaluate/:id" element={<EvaluationForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/responses"
              element={
                <ProtectedRoute>
                  <Responses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/by-event"
              element={
                <ProtectedRoute>
                  <ByEvent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
