import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function IdCheck(props) {

  const [idDuplChk, setIdDuplChk] = useState(false);
  const [idStart, setIdStart] = useState(false);
  const [idLength, setIdLength] = useState(false);

  function checkingIdAvail(cid) {
    if (!isNan(cid[0])) {
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
  }

  const getCollection = async () => {
    let idArray = [];
    // 컬렉션명으로 하위 도큐먼트를 읽어온다.
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    // 배열로 얻어온 도큐먼트의 갯수만큼 반복
    querySnapshot.forEach((doc) => {
      // 콜백된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기

      idArray.push(doc.id);
    });
    // 파싱된 데이터를 통해 스테이트 변경 및 리렌더링
    return idArray;
  }

  const checkingIdDupl = () => {
    const cid = document.getElementById('userId').value;
    const chkArr = getCollection();
    for(let i=0; i<chkArr.length ; i++){
      if(cid===chkArr[i]){
        alert('이미 사용중인 아이디입니다.');
        setIdDuplChk(false);
        return;
      }
      setIdDuplChk(true);
      alert('사용가능한 아이디입니다.');
    }
  }

  return (<>
    <tr>
      <td className="star">아이디</td>
      <td>
        <input type="text" id="userId" />
        &nbsp;&nbsp;
        <button>중복확인</button> &nbsp;<span id="idDuplMsg" style={{color:'green'}}>{idDuplChk?'(사용가능한 아이디입니다.)':''}</span>
        <br />
        <span>+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span>
      </td>
    </tr>
  </>);
}
export default IdCheck;