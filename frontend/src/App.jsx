import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SecuredPage from "./pages/SecuredPage";
import AdminRoute from "./helpers/AdminRoute";
import PrivateRoute from "./helpers/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route
            path="/secured"
            element={
              <PrivateRoute>
                <SecuredPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <SecuredPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
