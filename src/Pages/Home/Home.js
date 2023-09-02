import { Link, useNavigate } from "react-router-dom";
import { useCountContext, useUserContext } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../Constant/axios";
import Display from "../Display/Display";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Home() {
  const [userData] = useUserContext();
  const [allQuestions, setAllQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useCountContext(3);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
  }, [userData.user, navigate]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("api/question/all");
      // console.log(request)
      const reverseQuestions = request.data.data.reverse();
      setAllQuestions(reverseQuestions);
      return request;
    }
    fetchData();
  }, [userData.user]);
  // console.log(allQuestions);

  const increment = () => {
    setCount(count + 3);
  };

  return (
    <div className="home flex justify-center">
      <div className="home__container">
        <div className="home__header flex align-center justify-space-between">
          <div className="home_welcome">
            <h2 className="flex-column align-center center">
              <p>Welcome</p>
              <Link to="/">{userData.user?.display_name}</Link>
            </h2>
          </div>
          <div className="home__question--btn">
            <Link className="btn col-5 bg-1 btn-1 transition" to="/question">
              Ask Question
            </Link>
          </div>
        </div>
        <div className="home__search flex">
          <form>
            <SearchIcon className="search__icon" />
            <input
              className="transition"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions"
            />
          </form>
        </div>
        <div className="home__questions">
          <h2>Questions</h2>
          <div className="question_content">
            {allQuestions
              .filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.question.toLowerCase().includes(search.toLowerCase());
              })
              .map(
                (items, index) =>
                  index < count && (
                    <Display
                      key={items.question_id}
                      data={items.question}
                      question_id={items.question_id}
                      user_id={items.user_id}
                    />
                  )
              )}
            <div className="question__more">
              <div className="more__btn" onClick={increment}>
                <button className="btn">
                  <span>
                    {count < allQuestions.length
                      ? "More Results"
                      : "Result End"}
                  </span>{" "}
                  {count < allQuestions.length ? <KeyboardArrowDownIcon /> : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
