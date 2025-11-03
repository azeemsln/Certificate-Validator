import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ValidatePage from "./pages/ValidatePage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ValidatePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
