import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login(props) {
  const {login} = useAuth();
  return (<>
    <div className="wrapper">
      <h2>여기는 로그인</h2>
      <form action="" onSubmit={(e)=>{
        e.preventDefault();
        if(e.target.userId.value.trim()===''){
          alert('아이디를 입력하세요');
          return;
        }
        if(e.target.userPw.value.trim()===''){
          alert('패스워드를 입력하세요');
          return;
        }
        login();
        alert('로그인 성공')
      }}>
        아이디:<input type="text" name="userId" id="userId" /><br />
        비밀번호:<input type="password" name="userPw" id="userPw" /><br />
        <input type="submit" value='로그인' />
      </form>
      <Link to='/regist'>회원가입</Link>
    </div>
  </>); 
}
export default Login;