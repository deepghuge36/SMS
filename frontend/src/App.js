import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/scripts/Auth/Register";
import Login from "./Components/scripts/Auth/Login";
import PrivateRoute from "./Components/reuseable/PrivateRoute";
import DashBoard from "./Components/scripts/Auth/DashBoard/DashBoard";
import setAuthToken from "./Components/utils/setAuthToken";
import JwtDecode from "jwt-decode";
import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
// import setAuthToken from "./Components/utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
function App() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    setAuthToken(token);
    const decoded = JwtDecode(token);
    store.dispatch(onLoginSuccess(decoded));
  }
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
      </Router>
    </Provider>
  );
}

export default App;
