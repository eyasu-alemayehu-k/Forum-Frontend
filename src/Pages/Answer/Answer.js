import { Link, useSearchParams } from "react-router-dom";
import "./Answer.css";
import axios from "../../Constant/axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import Display from "../Display/Display";
import { useNavigate } from "react-router-dom";

function Answer() {
  const [userData] = useUserContext();
  const [searchparams] = useSearchParams();
  const [getQuestion, setQuestion] = useState([]);
  const [form, setForm] = useState({});
  const [allAnswers, setAllAnswers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  let qid = searchparams.get("id");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("api/question/qid", {
        qid: qid,
      });
      // console.log(request);
      setQuestion(request.data.data);
      return request;
    }
    fetchData();
  }, [qid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const questionAddRes = await axios.post("api/answer/add", {
        answer: form.answer,
        answer_code_block: "...",
        user_id: userData.user.id,
        question_id: qid,
      });

      setForm({});
      alert(questionAddRes.data.msg);
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("api/answer/qid", {
        qid: qid,
      });
      // console.log(request)
      const reverseAnswer = request.data.data.reverse();
      setAllAnswers(reverseAnswer);
      return request;
    }
    fetchData();
  }, [qid]);
  // console.log(allAnswers);

  return (
    <div className="answer flex-column align-center justify-center">
      <div className="answer__allContainer flex-column align-center justify-center">
        <div className="answer__container">
          {getQuestion.map((items) => (
            <div>
              <div className="answer__question">
                <h1 className="mb-1 col-1">Questions</h1>
                <h3>{items.question}</h3>
                <p>🤔 {items.question_description}</p>
              </div>
            </div>
          ))}
          <div className="answer_title">
            <h2>Answer From The Community</h2>
            <div className="answer__view">
              {allAnswers.map((items) => (
                <Display
                  key={items.answer_id}
                  data={items.answer}
                  question_id={items.question_id}
                  user_id={items.user_id}
                  answer_view
                />
              ))}
            </div>
          </div>
        </div>
        <div className="answer__form">
          <h1 className="mb-1 col-1">Answer The Top Question</h1>
          <Link to="/">Go to Question page</Link>
          <form onSubmit={handleSubmit}>
            <textarea
              className="textarea"
              name="answer"
              onChange={handleChange}
              id=""
              cols="60"
              rows="10"
              placeholder="Your Answer..."
            ></textarea>
            <br />
            <button className="btn btn-1 bg-2" disabled={form.answer ? false : true}>Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
