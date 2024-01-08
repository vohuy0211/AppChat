import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import HomeChat from "./Component/HomeChat/HomeChat";
import ChatAll from "./Component/ChatAll/ChatAll";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/Login"
          element={
              <Login />
          }
        />
        <Route
          path="/"
          element={
              <HomeChat />
          }
        />
        <Route
          path="/Register"
          element={
              <Register />
          }
        />
        <Route
          path="/ChatAll"
          element={
              <ChatAll />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
