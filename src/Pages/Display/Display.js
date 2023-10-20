import axios from "../../Constant/axios";
import "./Display.css";
import moment from "moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

function Display({ data, question_id, user_id, answer_view, date }) {
  const [name, setName] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("api/users/id", {
        id: user_id,
      });
      // console.log(request);
      setName(request.data.data.user_name);
      return request;
    }
    fetchData();
  }, [user_id]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("api/answer/count", {
        qid: question_id,
      });
      // console.log(request);
      setAnswerCount(request.data["data"][0]["COUNT(*)"]);
      return request;
    }
    fetchData();
  }, [question_id]);


  const openAnswersPage = (id) => {
    navigate({
      pathname: "/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  let column = "";
  if (answer_view) {
    column = "column";
  }

  // const formattedDate = new Date(date).toLocaleString();
  const formattedDate = moment(date).format("DD-MM-YYYY");
  return (
    <div
      className="display flex align-center justify-space-between transition"
      onClick={() => openAnswersPage(question_id)}
    >
      <div
        className={`display__container flex align-center justify-space-between ${column}`}
      >
        <div className="avatar">
          <img src="/avatar.png" alt="user avatar" />
          <h4>{name}</h4>
        </div>
        <div className="question">
          {!answer_view ? (
            <div className="question__content">
              <h3>{data}</h3>
              <div className="question__detail">
                <p>
                  Answers{" "}
                  <div className="number">
                    <span>{answerCount}</span>{" "}
                  </div>{" "}
                </p>
                <p className="question__date">{formattedDate}</p>
              </div>
            </div>
          ) : (
            <div className="answer__content">
              <p>{data}</p>
              <p className="answer__date">{formattedDate}</p>
            </div>
          )}
        </div>
      </div>
      {!answer_view ? (
        <Link className="right__arrow">
          <ArrowForwardIosIcon />
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default Display;
