import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import "./Profile.css";
import axios from "../../Constant/axios";
import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  const [userData] = useUserContext();
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({});

  //importing global state from context
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form.email);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("api/users/id", {
        id: userData.user.id,
      });
      // console.log(request)
      setUser(request.data.data);
      return request;
    }
    fetchData();
  }, [userData.user]);
  //   console.log(user);

  const email = document.querySelector(".email");
  const username = document.querySelector(".username");
  const fullname = document.querySelector(".fullname");

  function changeDisable(num) {
    if (num === 1) {
      email.disabled = false;
    } else if (num === 2) {
      username.disabled = false;
    } else if (num === 3) {
      fullname.disabled = false;
    }
  }
  return (
    <div className="profile  flex align-center justify-center">
      {user ? (
        <div className="profile__card" key={user.user_id}>
          <img src="/avatar.png" alt="user avatar" />
          <div className="profile__info">
            <form>
              <p className="flex align-center">
                <span className="left">Email</span>{" "}
                <span className="right">
                  <input
                    className="input email"
                    name="email"
                    type="text"
                    placeholder={user.user_email}
                    disabled
                    onChange={handleChange}
                  />
                  <EditIcon
                    className="edit_icon"
                    onClick={() => changeDisable(1)}
                  />
                </span>
              </p>
              <p className="flex align-center">
                <span className="left">Username</span>{" "}
                <span className="right">
                  <input
                    className="input username"
                    type="text"
                    name="username"
                    placeholder={user.user_name}
                    onChange={handleChange}
                    disabled
                  />
                  <EditIcon
                    className="edit_icon"
                    onClick={() => changeDisable(2)}
                  />
                </span>
              </p>
              <p className="flex align-center">
                <span className="left">Fullname</span>{" "}
                <span className="right">
                  <input
                    className="input fullname"
                    name="fullname"
                    type="text"
                    placeholder={`${user.first_name} ${user.last_name}`}
                    onChange={handleChange}
                    disabled
                  />
                  <EditIcon
                    className="edit_icon"
                    onClick={() => changeDisable(3)}
                  />
                </span>
              </p>
            </form>
          </div>
          <div className="profile__button">
            <button className="btn">Edit Profile</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
