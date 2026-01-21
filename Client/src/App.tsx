import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";

function App() {
  const [page, setPage] = useState("Login");
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8000/");
    setArray(response.data.message);
    console.log(response.data.message);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <ul>
        <li onClick={() => setPage("Login")}>
          <a>Login</a>
        </li>
        <li onClick={() => setPage("Register")}>
          <a>Register</a>
        </li>
      </ul>
      {page === "Login" ? <Login /> : null}
      {page === "Register" ? <Register /> : null}
    </>
  );
}

export default App;
