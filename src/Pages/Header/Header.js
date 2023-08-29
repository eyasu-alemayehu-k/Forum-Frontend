import { useUserContext } from "../../Context/UserContext";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [userData, setUserData] = useUserContext();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className="header flex align-center justify-space-evenly">
      <img
        src="/evangadi-logo.png"
        alt="Evangadi logo"
        className="header__logo"
      />
      <div className="header__link flex align-center ">
        <Link
          to="/"
          className="col-4 transition clear_link link-1"
        >
          Home
        </Link>
        <Link to="/" className="col-4 transition clear_link link-1">
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
          <Link className="btn col-5 bg-1 btn-1 transition" to="/signup">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
