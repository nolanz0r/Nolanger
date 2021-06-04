import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_KEY || "";

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
