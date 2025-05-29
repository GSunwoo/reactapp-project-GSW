import { useEffect, useState } from "react";
import { firestore } from "../../config/firestoreConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import '../../css/registform.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

function MemberEdit(props) {

  const navigate = useNavigate();

  const { itsMe, isLoggedIn } = useAuth();
  const [nowData, setNowData] = useState({});
  console.log(itsMe, isLoggedIn);

  const [spEmail, setSpEmail] = useState([]);
  const [spPhone, setSpPhone] = useState([]);

  const splitEmail = (email) => {
    const sEmail = email.split('@');
    setSpEmail(sEmail);
    setNowData({...nowData, email:email});
  }

  const splitPhone = (hp) => {
    const sPhone = hp.split('-');
    setSpPhone(sPhone);
    setNowData({...nowData, hp:hp});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name',name);
    console.log('value',value);
    setNowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCollection = async () => {
    const querySnapshot = await getDoc(doc(firestore, 'members', itsMe));
    let myData = querySnapshot.data();
    splitEmail(myData.email);
    splitPhone(myData.hp);
    setNowData(myData);
    console.log(myData);
  }

  const [pwChk, setpwChk] = useState(false);

  // 멤버 수정
  const memberWrite = async (newMem) => {
    await setDoc(doc(firestore, 'members', newMem.id), newMem);
    console.log('수정성공');
  }

  useEffect(() => {
    // 우편번호
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 아이디 가져오기
    getCollection();
  }, [ itsMe ]);

  // 우편번호
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById('zipcode').value = data.zonecode;
        document.getElementById('roadAddress').value = data.roadAddress;
        setNowData({...nowData, zip:data.zonecode, addr:data.roadAddress});
        document.getElementById('detailAddress').focus();
      },
    }).open();
  };

  // 전화번호 포커스 이동
  function commonFocusMove(obj1, maxLen, obj2) {
    var obj = document.getElementById(obj1);
    var strLen = obj.value.length;
    if (strLen == maxLen) {
      document.getElementById(obj2).focus();
    }
  }

  return (<>
    <h2>정보 수정</h2>
    <form method="post" className="registForm" style={{ margin: '20px' }} onSubmit={(e) => {
      e.preventDefault();

      const newMember = {
        id: nowData.id,
        pw: nowData.pw,
        name: nowData.name,
        email: nowData.email,
        zip: nowData.zip,
        addr: nowData.addr,
        dAddr: nowData.dAddr,
        hp: nowData.hp
      }

      if (newMember.pw === '') {
        alert('비밀번호를 입력하세요');
        return;
      }

      if (!pwChk) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (newMember.name === '') {
        alert('이름을 입력하세요');
        return;
      }

      if (newMember.zip === '') {
        alert('우편번호를 입력하세요');
        return;
      }

      if (newMember.dAddr === '') {
        alert('상세주소를 입력하세요');
        return;
      }

      if (newMember.hp === '') {
        alert('전화번호를 입력하세요');
        return;
      }

      memberWrite(newMember);

      navigate('/mypage');
    }}>
      <table>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td className="star">아이디</td>
            <td>
              <input type="text" id="userId" name="id" value={nowData.id} readOnly />
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호</td>
            <td>
              <input type="password" id="userPw" onChange={(e) => {
                handleChange(e);
                let pw = document.getElementById('userPwCheck').value;
                if (e.target.value === pw && pw !== '') {
                  setpwChk(true);
                }
                else {
                  setpwChk(false);
                }
              }} placeholder="패스워드" name="pw" value={nowData.pw} />
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호 확인</td>
            <td>
              <input type="password" id="userPwCheck" onChange={(e) => {
                let pw = document.getElementById('userPw').value;
                if (e.target.value === pw && pw !== '') {
                  setpwChk(true);
                }
                else {
                  setpwChk(false);
                }
                document.getElementById('checkingMessage').hidden = false;
              }} placeholder="패스워드 확인" />
              &nbsp;&nbsp;<span id="checkingMessage" style={pwChk ? { color: 'green' } : { color: 'red' }} hidden>{pwChk ? '(비밀번호가 일치합니다)' : '(비밀번호가 일치하지 않습니다.)'}</span>
            </td>
          </tr>
          <tr>
            <td className="star">이름</td>
            <td>
              <input type="text" id="userName" placeholder="이름" name="name" value={nowData.name} onChange={(e)=>{handleChange(e)}}/>
            </td>
          </tr>
          <tr>
            <td className="star">이메일</td>
            <td>
              <input type="text" name="emailName" id="emailName"  placeholder="email" value={spEmail[0]} onChange={(e)=>{splitEmail(e.target.value+'@'+spEmail[1])}}/> @
              <input type="text" name="emailDomain" id="emailDomain" placeholder="직접 입력" style={{ marginLeft: '7px' }} value={spEmail[1]} onChange={(e)=>{splitEmail(spEmail[0]+'@'+e.target.value)}}/>
              &nbsp;
              <select id="emailSelect" onChange={(e) => {
                if (e.target.value === '0') {
                  document.getElementById('emailDomain').readOnly = false;
                  document.getElementById('emailDomain').value = '';
                }
                else {
                  const index = e.target.selectedIndex;
                  document.getElementById('emailDomain').value = e.target.options[index].text;
                  document.getElementById('emailDomain').readOnly = true;
                }
              }} style={{ fontSize: '0.9em' }}>
                <option value="0">직접입력</option>
                <option value="1">gmail.com</option>
                <option value="2">naver.com</option>
                <option value="3">daum.net</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="star" rowSpan="3">주소</td>
            <td>
              <button type="button" onClick={handleAddressSearch}>주소찾기</button>&nbsp;&nbsp;
              <input type="text" id="zipcode" style={{ width: "100px" }} readOnly placeholder="우편번호" name="zip" value={nowData.zip} onChange={(e)=>{handleChange(e)}}/> (우편번호)
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="roadAddress" style={{ width: "97%" }} readOnly placeholder="주소" name="addr" value={nowData.addr} onChange={(e)=>{handleChange(e)}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="detailAddress" style={{ width: "70%" }} placeholder="상세주소" name="dAddr" value={nowData.dAddr} onChange={(e)=>{handleChange(e)}}/>
              &nbsp;<span style={{ color: 'gray' }}>(상세주소)</span>
            </td>
          </tr>
          <tr>
            <td className="star">전화번호</td>
            <td>
              <input type="text" maxLength={3} id="firstNum" name="firstNum" style={{ width: "50px" }} value={spPhone[0]} onChange={(e)=>{
                splitPhone(`${e.target.value}-${spPhone[1]}-${spPhone[2]}`);
              }} onKeyUp={() => commonFocusMove('firstNum', 3, 'midNum')} />&nbsp;-&nbsp;

              <input type="text" maxLength={4} id="midNum" name="midNum" style={{ width: "50px" }} value={spPhone[1]} onChange={(e)=>{
                splitPhone(`${spPhone[0]}-${e.target.value}-${spPhone[2]}`);
              }} onKeyUp={() => commonFocusMove('midNum', 4, 'lastNum')} />&nbsp;-&nbsp;

              <input type="text" maxLength={4} id="lastNum" name="lastNum" style={{ width: "50px" }} value={spPhone[2]} onChange={(e)=>{
                splitPhone(`${spPhone[0]}-${spPhone[1]}-${e.target.value}`);
              }} onKeyUp={() => commonFocusMove('lastNum', 4, 'sub')} />
            </td>
          </tr>
        </tbody>
        <tfoot style={{ textAlign: 'center' }}>
          <tr>
            <td colSpan={2} style={{ border: 'none' }}>
              <input type="submit" value="수정하기" id="sub" />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}
export default MemberEdit;