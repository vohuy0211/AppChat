import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import HomeChat from "./Component/HomeChat/HomeChat";
import HomeChatUser from "./pages/HomeChat";
import ChatAll from './Component/ChatAll/ChatAll';
import WelCome from "./pages/WelCome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<HomeChat />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/chat" element={<HomeChatUser>
          <WelCome/>
        </HomeChatUser>}/>
        <Route path="/ChatAll/:id" element=
          {<HomeChatUser>
            <ChatAll />
          </HomeChatUser>} />
      </Routes>
    </div>
  );
}

export default App;
