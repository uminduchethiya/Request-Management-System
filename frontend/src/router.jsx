import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./views/admin/AdminDashboard";
import Signin from "./views/auth/Signin";
import Signup from "./views/auth/Signup";
import PrivateRoute from "./components/PrivateRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admindashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

export default AppRouter;
