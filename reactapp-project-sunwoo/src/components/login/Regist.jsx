import { useEffect, useState } from "react";
import { firestore } from "../../config/firestoreConfig";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import '../../css/registform.css';
import { useNavigate } from "react-router-dom";


function Regist(props) {
  const [memberIds, setMemberIds] = useState([]);

  const [idDuplChk, setIdDuplChk] = useState(false);
  const [idStart, setIdStart] = useState(false);
  const [idLength, setIdLength] = useState(false);

  const navigate = useNavigate();

  function checkingIdAvail(cid) {
    if (!isNaN(cid[0])) {
      setIdStart(false);
    }
    else {
      setIdStart(true);
    }
    if (cid.length < 4 || cid.length > 16) {
      setIdLength(false);
    }
    else {
      setIdLength(true);
    }
    setIdDuplChk(false);
  }

  const getCollection = async () => {
    let idArray = [];
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      idArray.push(doc.id);
    });
    setMemberIds(idArray);
  }

  const checkingIdDupl = () => {
    const cid = document.getElementById('userId').value;
    const chkArr = memberIds;
    if(!idLength){
      alert('4~15자 사이로 입력해주세요.');
      return; 
    }
    if(!idStart){
      alert('아이디는 영문으로 시작해야합니다.');
      return;
    }
    console.log(chkArr);
    for(let i=0; i<chkArr.length ; i++){
      console.log('cid:', cid, 'db:',chkArr[i]);
      if(cid===chkArr[i]){
        alert('이미 사용중인 아이디입니다.');
        setIdDuplChk(false);
        return;
      }
    }
    setIdDuplChk(true);
    alert('사용가능한 아이디입니다.');
  }



  const [pwChk, setpwChk] = useState(false);

  // 날짜 함수
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  // 멤버 추가
  const memberWrite = async (newMem) => {
    // doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, 'members', newMem.id), {...newMem, time:nowDate(), mygroup:['1','2']});
    console.log('입력성공');
  }

  useEffect(() => {
    // 우편번호
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 아이디 가져오기
    getCollection();
  }, []);

  // 우편번호
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById('zipcode').value = data.zonecode;
        document.getElementById('roadAddress').value = data.roadAddress;
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
    <h2>회원가입폼</h2>
    <form method="post" className="registForm" style={{ margin: '20px' }} onSubmit={(e) => {
      e.preventDefault(); 

      const newMember = {
        id: e.target.userId.value,
        pw: e.target.userPw.value,
        name: e.target.userName.value,
        email: e.target.emailName.value+'@'+e.target.emailDomain.value,
        zip: e.target.zipcode.value,
        addr: e.target.roadAddress.value,
        dAddr: e.target.detailAddress.value,
        hp: e.target.firstNum.value+'-'+e.target.midNum.value+'-'+e.target.lastNum.value,
      }

      if(!idDuplChk){
        alert('사용가능한 아이디인지 확인하세요.');
        return;
      }

      if(newMember.id===''){
        alert('아이디를 입력하세요');
        return;
      }

      if(newMember.pw===''){
        alert('비밀번호를 입력하세요');
        return;
      }

      if(!pwChk){
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      if(newMember.name===''){
        alert('이름을 입력하세요');
        return;
      }

      if(e.target.emailName.value===''){
        alert('이메일 아이디를 입력하세요');
        return;
      }

      if(e.target.emailDomain.value===''){
        alert('이메일 도메인 입력하세요');
        return;
      }

      if(newMember.zip===''){
        alert('우편번호를 입력하세요');
        return;
      }

      if(newMember.dAddr===''){
        alert('상세주소를 입력하세요');
        return;
      }

      if(newMember.hp===''){
        alert('전화번호를 입력하세요');
        return;
      }

      memberWrite(newMember);

      navigate('/');
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
              <input type="text" id="userId" onChange={(e)=>{
                checkingIdAvail(e.target.value);
              }} placeholder="아이디"/>
              &nbsp;&nbsp;
              <button type="button" onClick={checkingIdDupl}>중복확인</button> 
              &nbsp;<span id="idDuplMsg" style={{ color: 'green' }}>{idDuplChk ? '(사용가능한 아이디입니다.)' : ''}</span>
              <br />
              <span>+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span>
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호</td>
            <td>
              <input type="password" id="userPw" onChange={(e) => {
                let pw = document.getElementById('userPwCheck').value;
                if (e.target.value === pw && pw !== '') {
                  setpwChk(true);
                }
                else {
                  setpwChk(false);
                }
              }} placeholder="패스워드"/>
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
              }} placeholder="패스워드 확인"/>
              &nbsp;&nbsp;<span id="checkingMessage" style={pwChk ? { color: 'green' } : { color: 'red' }} hidden>{pwChk ? '(비밀번호가 일치합니다)' : '(비밀번호가 일치하지 않습니다.)'}</span>
            </td>
          </tr>
          <tr>
            <td className="star">이름</td>
            <td>
              <input type="text" id="userName" placeholder="이름"/>
            </td>
          </tr>
          <tr>
            <td className="star">이메일</td>
            <td>
              <input type="text" name="" id="emailName" placeholder="email" /> @
              <input type="text" name="" id="emailDomain" placeholder="직접 입력" style={{marginLeft:'7px'}}/>
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
              }} style={{fontSize:'0.9em'}}>
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
              <input type="text" id="zipcode" style={{ width: "100px" }} readOnly placeholder="우편번호"/> (우편번호)
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="roadAddress" style={{ width: "97%" }} readOnly placeholder="주소"/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="detailAddress" style={{ width: "70%" }} placeholder="상세주소"/>
              &nbsp;<span style={{ color: 'gray' }}>(상세주소)</span>
            </td>
          </tr>
          <tr>
            <td className="star">전화번호</td>
            <td>
              <input type="text" maxLength={3} id="firstNum" style={{ width: "50px" }} onKeyUp={() => commonFocusMove('firstNum', 3, 'midNum')} />&nbsp;-&nbsp;
              <input type="text" maxLength={4} id="midNum" style={{ width: "50px" }} onKeyUp={() => commonFocusMove('midNum', 4, 'lastNum')} />&nbsp;-&nbsp;
              <input type="text" maxLength={4} id="lastNum" style={{ width: "50px" }} onKeyUp={() => commonFocusMove('lastNum', 4, 'sub')} />
            </td> 
          </tr>
        </tbody>
        <tfoot style={{ textAlign: 'center' }}>
          <tr>
            <td colSpan={2} style={{ border: 'none' }}>
              <input type="submit" value="가입하기" id="sub" />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}
export default Regist;