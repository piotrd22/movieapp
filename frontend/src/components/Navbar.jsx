import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const isAdmin = keycloak.hasRealmRole("app_admin");

  return (
    <nav className="navbar border-b bordered border-base-300 bg-base-100 mb-5 p-5">
      <div className="container flex items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold ">MovieWEB</span>
        </a>

        <ul className="menu menu-horizontal flex items-center justify-center px-1 ">
          {!keycloak.authenticated && (
            <li>
              <a href="/topmovies" className="btn btn-primary ml-2">
                TOP MOVIES
              </a>
              <a href="/signup" className="btn btn-primary ml-2">
                Signup
              </a>
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={() => keycloak.login()}
              >
                Login
              </button>
            </li>
          )}
          {!!keycloak.authenticated && (
            <li>
              {isAdmin && (
                <a href="/admin" className="btn btn-primary ml-2">
                  Admin Panel
                </a>
              )}
              <a href="/topmovies" className="btn btn-primary ml-2">
                TOP MOVIES
              </a>
              <a href="/myreviews" className="btn btn-primary ml-2">
                MY REVIEWS
              </a>
              <a
                href={`/update/${keycloak.idTokenParsed.sub}`}
                className="btn btn-primary ml-2"
              >
                Update Profile
              </a>
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={() => {
                  navigate("/");
                  keycloak.logout();
                }}
              >
                Logout ({keycloak.tokenParsed.preferred_username})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
