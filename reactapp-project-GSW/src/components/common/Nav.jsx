import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";


function Nav() {

  const { isLoggedIn, logout } = useAuth();

  return (<>
    <div id="header-wrapper">
      <div id="header" class="container">
        <div id="logo">
          <h1><Link to='/'>리액트 프로젝트</Link></h1>
        </div>
        <div id="menu">
          <ul>
            {/* <li class="current_page_item"><Link to='/mypage'  accessKey="1" title="">마이페이지</Link></li> */}
            <li className="current_page_item">
                {isLoggedIn ? (
                  <Link to="/mypage" accessKey="1" title="">마이페이지</Link>
                ) : (
                  <Link to="/login" accessKey="1" title="">로그인</Link>
                )}
            </li>
            <li><Link to='/pubboard' accessKey="2" title="">자유 게시판</Link></li>
            <li><Link to='/qnaboard' accessKey="3" title="">질문 게시판</Link></li>
            <li><Link to='/searchgroup' accessKey="4" title="">그룹 찾기</Link></li>
            <li>
                {isLoggedIn ? (
                  <button accessKey="5" onClick={(e)=>{
                    logout();
                    alert('로그아웃 됨');
                  }}>로그아웃</button>
                ) : (
                  <></>
                )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>);
}
export default Nav;