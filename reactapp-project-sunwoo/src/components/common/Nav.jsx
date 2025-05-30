import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { useState } from "react";


function Nav() {

  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  return (<>
    <div id="header-wrapper">
      <div id="header" className="container">
        <div id="logo">
          <h1><Link to='/'>리액트 프로젝트</Link></h1>
        </div>
        <div id="menu">
          <ul>
            {/* <li class="current_page_item"><Link to='/mypage'  accessKey="1" title="">마이페이지</Link></li> */}
            <li className={currentPath === '/mypage' ? 'current_page_item' : ''}>
                {isLoggedIn ? (
                  <Link to="/mypage" accessKey="1" title="">마이페이지</Link>
                ) : (
                  <Link to="/login" accessKey="1" title="">로그인</Link>
                )}
            </li>
            <li className={currentPath === '/pubboard' ? 'current_page_item' : ''}>
              <Link to='/pubboard' accessKey="2" title="">공용 게시판</Link></li>
            <li className={currentPath === '/qnaboard' ? 'current_page_item' : ''}>
              <Link to='/qnaboard' accessKey="3" title="">질문 게시판</Link></li>
            <li className={currentPath === '/searchgroup' ? 'current_page_item' : ''}>
              <Link to='/searchgroup' accessKey="4" title="">그룹 찾기</Link></li>
            <li>
                {isLoggedIn ? (
                  <button accessKey="5" onClick={()=>{
                    if(confirm('로그아웃 하시겠습니까?')){
                      logout();
                      alert('로그아웃 됨');
                    }
                  }} style={{cursor:'pointer'}}>로그아웃</button>
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