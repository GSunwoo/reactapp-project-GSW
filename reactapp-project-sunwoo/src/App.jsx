import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/login/AuthContext";

// 컴포넌트
import Nav from "./components/common/Nav";
import Mypage from "./components/mypage/Mypage";
import PublicBoard from "./components/publicboard/PublicBoard";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import GroupBoard from "./components/groupboard/GroupBoard";
import Searchgroup from "./components/searchgroup/Searchgroup";
import Footer from "./components/common/Footer";
import QnABoard from "./components/qnaboard/QnABoard";
import GroupChat from "./components/groupchat/GroupChat";
import Regist from "./components/login/Regist";

function App() {

  return (
  <div id="main">
    <div id="main-wrapper">
    <AuthProvider>
      {/* 상단바 */}
      <Nav />

      {/* 메인 */}
      <article id="article" className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/regist" element={<Regist/>}/>
          <Route path="/mypage" element={<Mypage/>}/>
          <Route path="/pubboard" element={<PublicBoard/>}/>
          <Route path="/qnaboard" element={<QnABoard/>}/>
          <Route path="/searchgroup" element={<Searchgroup/>}/>
          <Route path="/groupboard">
            <Route index element={<GroupBoard/>}/>
            <Route path="groupchat" element={<GroupChat/>}/>
          </Route>
        </Routes>
      </article>

      {/* 하단바 */}
      <Footer />
    </AuthProvider>
    </div>
  </div>
  );
}

export default App
