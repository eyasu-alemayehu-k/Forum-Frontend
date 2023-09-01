import { useEffect } from "react";
import "./App.css";
import { useUserContext } from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import SharedLayout from "./Shared/SharedLayout";
import Question from "./Pages/Question/Question";
import Answer from "./Pages/Answer/Answer";
import axios from "./Constant/axios";

function App() {
  const [userData, setUserData] = useUserContext();
  console.log(userData);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (!token) {
        localStorage.setItem("auth-token", "");
        token = "";
      } else {
        try {
          const userRes = await axios.get("api/users", {
            headers: { "x-auth-token": token },
          });

          setUserData({
            token,
            user: {
              id: userRes.data.data.user_id,
              display_name: userRes.data.data.user_name,
            },
          });
        } catch (error) {
          // Handle error if the request fails
          console.error(error);
        }
      }
    };

    checkLoggedIn();
  }, [setUserData]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/question" element={<Question />} />
            <Route path="/answer" element={<Answer />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
