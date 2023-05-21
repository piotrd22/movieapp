import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./pages/WelcomePage";
import SecuredPage from "./pages/SecuredPage";
import AdminRoute from "./helpers/AdminRoute";
import PrivateRoute from "./helpers/PrivateRoute";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<Signup />} />
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
