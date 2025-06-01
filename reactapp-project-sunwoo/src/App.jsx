import { Route, Routes, useLocation } from "react-router-dom";

// 컨텍스트
import { AuthProvider } from "./components/login/AuthContext";
import { GroupProvider } from "./components/common/GroupContext";
import { PublicProvider } from "./components/common/PublicContext";
import { DocProvider } from "./components/common/DocContext";

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
import EnterGroup from './components/searchgroup/EnterGroup'
import ViewGroup from "./components/group/ViewGroup";
import PublicWrite from "./components/publicboard/PublicWrite";
import PublicView from "./components/publicboard/PublicView";
import PublicEdit from "./components/publicboard/PublicEdit";
import DocBoard from "./components/docboard/DocBoard";
import DocUpload from "./components/docboard/DocUpload";

function App() {
  const location = useLocation();

  const isGroupChatPage = location.pathname === "/group/groupchat";

  return (
  <div id="main">
    <div id="main-wrapper">
    <AuthProvider>
      {/* 상단바 */}
      {!isGroupChatPage && <Nav />}

      <div id="article" className="container">
      <PublicProvider>
      <DocProvider>
      <GroupProvider>
         {/* 메인 */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/regist" element={<Regist/>}/>
            <Route path="/mypage" element={<Mypage/>}/>

            {/* 공용게시판 */}
            <Route path="/pubboard" element={<PublicBoard/>}/>
            <Route path="/pubboard/write" element={<PublicWrite/>}/>
            <Route path="/pubboard/view/:id" element={<PublicView/>}/>
            <Route path="/pubboard/edit/:id" element={<PublicEdit/>}/>

            {/* 그룹 */}
            <Route path="/group/view/:id"element={<ViewGroup/>}  />
            <Route path="/group/regist" element={<RegistGroup />}/>
            <Route path="/group/groupchat" element={<GroupChat />}/>
            <Route path="/groupboard/:id" element={<GroupBoard/>}/>
            <Route path="/searchgroup" element={<Searchgroup/>}/>
            <Route path="/searchgroup/enter/:id" element={<EnterGroup/>}/>

            {/* 자료게시판 */}
            <Route path="/docboard" element={<DocBoard/>}/>
            <Route path="/docboard/upload" element={<DocUpload/>}/>
            
            <Route path="/qnaboard" element={<QnABoard/>}/>
            <Route path="/edit">
              <Route path="member" element={<MemberEdit/>}/>
            </Route>
          </Routes>
      </GroupProvider>
      </DocProvider>
      </PublicProvider>
      </div>
      {/* 하단바 */}
      <div id='footer'>
        {!isGroupChatPage && <Footer />}
      </div>
    </AuthProvider>
    </div>
  </div>
  );
}

export default App
