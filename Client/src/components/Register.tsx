import axios from "axios";
import { useState, type SyntheticEvent } from "react";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setSuccess("");
    setErrors("");

    const userData = {
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        userData,
      );

      if (response.data.success) {
        setSuccess("Registration successfull");
        console.log(response);
      } else {
        setErrors("Registration failed");
        console.log(response);
      }
    } catch (error) {
      setErrors("Error occured during Registration");
    }
  };

  return (
    <>
      <h1 className="titletext">Register</h1>
      <div className="container">
        <form className="input-group vertical" onSubmit={handleSubmit}>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            value={userName}
            onChange={(event: any) => setUserName(event.target.value)}
            placeholder="enter your name"
          />
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
          <p className="messagetext" style={{ color: "green" }}>
            {success}
          </p>
        ) : null}
        {errors ? (
          <p className="messagetext" style={{ color: "red" }}>
            {errors}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default Register;
