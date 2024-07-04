import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./views/admin/AdminDashboard";
import Signin from "./views/auth/Signin"
import Signup from "./views/auth/Signup";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

export default AppRouter;
