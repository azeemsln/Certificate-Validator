import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ValidatePage from "./pages/ValidatePage";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/validate" element={<ValidatePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
