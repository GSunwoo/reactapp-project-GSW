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
    // 컬렉션명으로 하위 도큐먼트를 읽어온다.
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    // 배열로 얻어온 도큐먼트의 갯수만큼 반복
    querySnapshot.forEach((doc) => {
      // 콜백된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기
      let memberInfo = doc.data();
      idArray.push({id:doc.id, pw:memberInfo.pw});
    });
    // 파싱된 데이터를 통해 스테이트 변경 및 리렌더링
    setMemberIds(idArray);
  }

  useEffect(()=>{
    // 아이디 비번 가져오기
    getCollection();
  })

  return (<>
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

        login();
        alert('로그인 성공');
      }}>
        ID<input type="text" name="userId" id="userId" /><br />
        PASSWORD<input type="password" name="userPw" id="userPw" /><br />
        <input type="submit" value='로그인' />
      </form>
      <Link to='/regist'>회원가입</Link>
    </div>
  </>); 
}
export default Login;