import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firestoreConfig";
import '../../css/login.css';

function Login(props) {
  const {login} = useAuth();
  const [memberIds, setMemberIds] = useState([]);

  const getCollection = async () => {
    let idArray = [];
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      idArray.push({id:doc.id, pw:memberInfo.pw});
      idArray.push([doc.id, memberInfo.pw]);
    });
    setMemberIds(idArray);
  }

  useEffect(()=>{
    // 아이디 비번 가져오기
    getCollection();
  })

  return (
  <article>
    <div className="wrapper-login">
      <h2>Login</h2>
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

        const currUser = memberIds.filter(curr=>curr.id===e.target.userId.value&&curr.pw===e.target.userPw.value);

        if(currUser.length===0){
          alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
          return;
        }

        login(e.target.userId.value);
        alert('로그인 성공');
      }}>
        ID<input type="text" name="userId" id="userId" /><br />
        PASSWORD<input type="password" name="userPw" id="userPw" /><br />
        <input type="submit" value='로그인' />
      </form>
      <Link to='/regist'>회원가입</Link>
    </div>
  </article>); 
}
export default Login;