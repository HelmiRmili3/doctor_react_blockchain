// import React from "react";
// import "../App.css";

// import { Link } from "react-router-dom";
// import { useMatch, useResolvedPath } from "react-router-dom";
// import { useAuth } from "../Contexts/authContext";

// export default function PatientNavBar() {
//   const { logOut, setIsLoggedIn } = useAuth();
//   const HandeleLogout = () => {
//     logOut();
//     setIsLoggedIn(false);
//   };
//   return (
//     <nav className="navbar">
//       <div to="#" className="navbar__logo">
//         Patient
//       </div>
//       <ul className="navbar__links">
//         <CustomLink to="/users/patient/profile">Profile</CustomLink>
//         <CustomLink to="/users/patient/collections">Calendar</CustomLink>
//       </ul>
//       <button className="navbar__logout" onClick={HandeleLogout}>
//         Logout
//       </button>
//     </nav>
//   );
// }

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }
