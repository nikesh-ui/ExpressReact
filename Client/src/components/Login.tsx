import axios from "axios";
import { useState, type SyntheticEvent } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [token, setToken] = useState("");
  const [page, setPage] = useState("LoginForm");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setSuccess("");
    setErrors("");

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        userData,
      );

      if (response.data.success) {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setCreatedAt(response.data.createdAt);
        // console.log(response.data.message);
        setSuccess("Login successfull");
        setPage("Landing");
        setToken(response.data.token);
        fetchAPI(token);
      } else {
        setErrors("Login failed");
        console.log(response);
      }
    } catch (error) {
      setErrors("Error occured during Login");
    }
  };

  const fetchAPI = async (token: string) => {
    const response = await axios.get("http://localhost:8000/landing", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    setUsername(response.data.username);
    setEmail(response.data.email);
    setCreatedAt(response.data.createdAt);
  };

  return (
    <>
      {page === "LoginForm" ? (
        <>
          <h1 className="titletext">Login</h1>
          <div className="container">
            <form className="input-group vertical" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                required
                placeholder="enter your email address"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event: any) => setPassword(event.target.value)}
                required
                placeholder="enter the password"
              />
              <div className="input-group">
                <button className="primary bordered medium">Submit</button>
                <span></span>
              </div>
            </form>
            {success ? (
              <>
                <p className="messagetext" style={{ color: "green" }}>
                  {success}
                </p>{" "}
                <a onClick={() => fetchAPI(token)}>redirect</a>
              </>
            ) : null}
            {errors ? (
              <p className="messagetext" style={{ color: "red" }}>
                {errors}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
      {page === "Landing" ? (
        <>
          <div className="container">
            <h1>Welcome {username}</h1>
            <p> your email address is {email}</p>
            <p>account created at {createdAt}</p>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Login;
