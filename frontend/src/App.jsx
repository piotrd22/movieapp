import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./helpers/PrivateRoute";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import More from "./pages/More";
import UpdateReview from "./pages/UpdateReview";
import UpdateUser from "./pages/UpdateUser";
import AdminRoute from "./helpers/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import UpdateMovie from "./pages/UpdateMovie";
import TopMovies from "./pages/TopMovies";

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
          <Route path="/more/:id" element={<More />} />
          <Route path="/topmovies" element={<TopMovies />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <AdminRoute>
                <UpdateMovie />
              </AdminRoute>
            }
          />
          <Route
            path="/review/:movieId/:id"
            element={
              <PrivateRoute>
                <UpdateReview />
              </PrivateRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <PrivateRoute>
                <UpdateUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
