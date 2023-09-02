import { useCountContext, useUserContext } from "../../Context/UserContext";
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [userData, setUserData] = useUserContext();
  const [toggle, setToggle] = useState(true);
  const [count, setCount] =useCountContext()


  console.log(count)

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
    setToggle(true);
    setCount(3)
  };
  // console.log(toggle);

  let hidden = "";
  if (toggle) {
    hidden = "hidden";
  }

  return (
    <div className="header flex align-center justify-space-evenly">
      <img
        src="/evangadi-logo.png"
        alt="Evangadi logo"
        className="header__logo"
      />
      <div className="mobile-menu" onClick={() => setToggle(!toggle)}>
        <span className="menu">
          {toggle ? (
            <MenuIcon className="menu-icon" />
          ) : (
            <CloseIcon className="close-icon" />
          )}
        </span>
      </div>
      <div className={`header__link flex align-center ${hidden} `}>
        <Link
          to="/"
          className="col-4 transition clear_link link-1"
          onClick={() => setToggle(true)}
        >
          Home
        </Link>
        <Link
          to="/"
          className="col-4 transition clear_link link-1"
          onClick={() => setToggle(true)}
        >
          How it Works
        </Link>
        {userData.user ? (
          <Link
            className="col-4 transition clear_link link-1 bold"
            onClick={logout}
          >
            Log out
          </Link>
        ) : (
          <Link
            className="btn col-5 bg-1 btn-1 transition"
            to="/signup"
            onClick={() => setToggle(true)}
          >
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
