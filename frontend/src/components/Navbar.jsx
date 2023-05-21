import { useKeycloak } from "@react-keycloak/web";

const Navbar = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <nav className="navbar border-b bordered border-base-300 bg-base-100 mb-5 p-5">
      <div className="container flex items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold ">MovieWEB</span>
        </a>

        <ul className="menu menu-horizontal flex items-center justify-center px-1 ">
          {!keycloak.authenticated && (
            <li>
              <a href="/signup" className="btn btn-primary">
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
              <a href="/update" className="btn btn-primary">
                Search For Movie
              </a>
              <a href="/update" className="btn btn-primary ml-2">
                Update Profile
              </a>
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={() => keycloak.logout()}
              >
                Logout ({keycloak.tokenParsed.preferred_username})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );

  //   return (
  //     <div>
  //       <div className="top-0 w-full flex flex-wrap">
  //         <section className="x-auto">
  //           <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
  //             <div className="px-5 xl:px-12 py-6 flex w-full items-center">
  //               <h1 className="text-3xl font-bold font-heading">
  //                 Keycloak React AUTH.
  //               </h1>
  //               <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
  //                 <li>
  //                   <a className="hover:text-blue-800" href="/">
  //                     Home
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a className="hover:text-blue-800" href="/secured">
  //                     Secured Page
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a className="hover:text-blue-800" href="/admin">
  //                     Admin Page
  //                   </a>
  //                 </li>
  //               </ul>
  //               <div className="hidden xl:flex items-center space-x-5">
  //                 <div className="hover:text-gray-200">
  //                   {!keycloak.authenticated && (
  //                     <button
  //                       type="button"
  //                       className="text-blue-800"
  //                       onClick={() => keycloak.login()}
  //                     >
  //                       Login
  //                     </button>
  //                   )}

  //                   {!!keycloak.authenticated && (
  //                     <button
  //                       type="button"
  //                       className="text-blue-800"
  //                       onClick={() => keycloak.logout()}
  //                     >
  //                       Logout ({keycloak.tokenParsed.preferred_username})
  //                     </button>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </nav>
  //         </section>
  //       </div>
  //     </div>
  //   );
};

export default Navbar;
