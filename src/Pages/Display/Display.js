import axios from "../../Constant/axios";
import "./Display.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

function Display({ data, question_id, user_id, answer_view}) {
  const [name, setName] = useState([]);
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

  const openAnswersPage = (id) => {
    navigate({
      pathname: "/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };
  
  let column = ""
  if(answer_view) {
    column = "column"
  }
  return (
    <div className="display flex align-center justify-space-between transition" onClick={()=>openAnswersPage(question_id)}>
      <div className={`display__container flex align-center justify-space-between ${column}`} >
        <div className="avatar">
          <img
            src="/avatar.png"
            alt="user avatar"
          />
          <h4>{name}</h4>
        </div>
        <div className="question">
          {!answer_view ? <h3>{data}</h3> : <p>{data}</p>}
        </div>
      </div>
      {!answer_view ? <Link className="right__arrow" ><ArrowForwardIosIcon  /></Link> : ""}
      
    </div>
  );
}

export default Display;
