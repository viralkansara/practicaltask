import { Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
