import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./views/admin/AdminDashboard";

const router= () => (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
export default router;