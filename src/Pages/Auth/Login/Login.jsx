import { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../Services/authService";
import { UserContext } from "../../../Context/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {setUser, user} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      if (response) {
        localStorage.setItem("token", response.data.token);
        setUser(username)
        console.log(user)
        navigate("/profile");
      } else {
        setError("Check your username or password");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <form>
        <section>
          <label>
            Username:
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </section>
        {error && <p>{error}</p>}
        <section>
          <button onClick={handleLogin}>Login</button>
        </section>
      </form>
    </div>
  );
};

export default Login;
