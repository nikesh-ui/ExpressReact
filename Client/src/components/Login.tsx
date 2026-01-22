import axios from "axios";
import { useState, type SyntheticEvent } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [token, setToken] = useState("");

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
        setSuccess("Login successfull");
        setToken(response.data.token);
        console.log(response);
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
    console.log(response.data.message);
  };

  return (
    <>
      <h1>Login</h1>
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
            <p style={{ color: "green" }}>{success}</p>{" "}
            <a href="#" onClick={() => fetchAPI(token)}>
              redirect
            </a>
          </>
        ) : null}
        {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
      </div>
    </>
  );
}

export default Login;
