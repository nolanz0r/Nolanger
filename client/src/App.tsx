import axios from "axios";
import { FC, useEffect } from "react";
import { setAuthToken } from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const App: FC = () => {
  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/register", {
        name: "Terry",
        email: "terry@test.com",
        password: "asd2dsa2sa",
      })
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        const decoded = jwt_decode(token);

        console.log(decoded);
      });
  }, []);

  return <div className="App"></div>;
};

export default App;
