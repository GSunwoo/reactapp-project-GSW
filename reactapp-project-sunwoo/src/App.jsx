import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/login/AuthContext";

// 컴포넌트
import Nav from "./components/common/Nav";
import Mypage from "./components/mypage/Mypage";
import PublicBoard from "./components/publicboard/PublicBoard";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import GroupBoard from "./components/group/groupboard/GroupBoard";
import Searchgroup from "./components/searchgroup/Searchgroup";
import Footer from "./components/common/Footer";
import QnABoard from "./components/qnaboard/QnABoard";
import GroupChat from "./components/group/groupchat/GroupChat";
import Regist from "./components/login/Regist";
import MemberEdit from "./components/mypage/MemberEdit";
import RegistGroup from "./components/group/RegistGroup";

import { GroupProvider } from "./components/common/GroupContext";
import ViewGroup from "./components/group/ViewGroup";

function App() {
  const location = useLocation();

  const isGroupChatPage = location.pathname === "/groupboard/groupchat";

  return (
  <div id="main">
    <div id="main-wrapper">
    <AuthProvider>
      {/* 상단바 */}
      {!isGroupChatPage && <Nav />}

      <GroupProvider>
         {/* 메인 */}
        <div id="article" className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/regist" element={<Regist/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/pubboard" element={<PublicBoard/>}/>

            <Route path="/group/view/:id"element={<ViewGroup/>}  />
            <Route path="/group/regist" element={<RegistGroup />}/>
            <Route path="/group/groupchat" element={<GroupChat />}/>
            <Route path="/groupboard/:id" element={<GroupBoard/>}/>
            
            <Route path="/qnaboard" element={<QnABoard/>}/>
            <Route path="/searchgroup" element={<Searchgroup/>}/>
            <Route path="/edit">
              <Route path="member" element={<MemberEdit/>}/>
            </Route>
          </Routes>
        </div>
      </GroupProvider>
      {/* 하단바 */}
      {!isGroupChatPage && <Footer />}
    </AuthProvider>
    </div>
  </div>
  );
}

export default App
