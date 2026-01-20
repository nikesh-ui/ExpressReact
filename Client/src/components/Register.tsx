import axios from "axios";
import { useState, type SyntheticEvent } from "react";

function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        userData,
      );
      console.log(response.data);
      if (response.data.success) {
        setSuccess("Registration Successfull");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError("Error occured during registration");
      console.error(error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div className="container">
        <form className="input-group vertical" onSubmit={handleSubmit}>
          <label htmlFor="email">User Name</label>
          <input
            type="username"
            name="username"
            placeholder="enter the user name"
            value={username}
            onChange={(event: any) => setusername(event.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter the email address"
            value={email}
            onChange={(event: any) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="enter the password"
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
            required
          />
          <div className="input-group">
            <button className="primary bordered medium">Submit</button>
            <span></span>
          </div>
        </form>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default Register;
