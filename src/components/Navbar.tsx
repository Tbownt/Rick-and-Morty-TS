import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width > 800) setShow(true);
      if (window.screen.width <= 800) setShow(false);
    };
    handleResize()

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar__box">
          <div className="navbar__div" />

          <div className="navbar__logo">
            <NavLink className="navbar__logo__link" to="/">
              <img src={logo} alt="logo" />
              <h1 className="navbar__title">Rick & Morty</h1>
              <img src={logo2} alt="logo" />
            </NavLink>
          </div>

          <div
            className="navbar__toggler"
            onClick={() => {
              setShow(!show);
            }}
          >
            <GiHamburgerMenu color="#fff" />
          </div>
        </div>
        <nav className={show ? "navbar__nav" : "navbar__nav--hidden"}>
          <ul>
            <li>
              <NavLink className="navbar__nav-link" key="characters" to="/">
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar__nav-link"
                key="episodes"
                to="/episodes"
              >
                Episodes
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar__nav-link"
                key="locations"
                to="/locations"
              >
                Locations
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar__nav-link"
                key="favorites"
                to="/favorites"
              >
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
