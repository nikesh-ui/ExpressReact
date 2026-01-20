import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [page, setpage] = useState("Login");

  return (
    <>
      <ul>
        <li onClick={() => setpage("Login")}>
          <a>Login</a>
        </li>
        <li onClick={() => setpage("Register")}>
          <a>Register</a>
        </li>
      </ul>
      {page === "Login" ? <Login /> : null}
      {page === "Register" ? <Register /> : null}
    </>
  );
}

export default App;
