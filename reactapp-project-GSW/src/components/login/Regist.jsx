import { useEffect } from "react";
import { firestore } from "../../config/firestoreConfig";
import '../../registForm.css';



function Regist(props) {

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  const memberWrite = async (p_id, p_pass, p_name) => {
    // doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, 'members', p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log('입력성공');
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById('zipcode').value = data.zonecode;
        document.getElementById('roadAddress').value = data.roadAddress;
        document.getElementById('detailAddress').focus();
      },
    }).open();
  };

  return (<>
    <h2>회원가입폼</h2>
    <form action="" className="registForm" style={{ margin: '20px' }}>
      <table>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td className="star">아이디</td>
            <td>
              <input type="text" id="userId" />
              &nbsp;&nbsp;
              <button>중복확인</button> &nbsp;
              <span>+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span>
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호</td>
            <td>
              <input type="password" id="userPw" />
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호 확인</td>
            <td>
              <input type="password" id="userPwCheck" />
              <span>&nbsp;&nbsp;(확인을 위해 다시 입력해주세요.)</span>
            </td>
          </tr>
          <tr>
            <td className="star">이름</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td className="star">이메일</td>
            <td>
              <input type="text" name="" id="" /> @
              <input type="text" name="" id="" />
              &nbsp;
              <select id="">
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
              <input type="text" id="zipcode" style={{ width: "100px" }} readOnly /> (우편번호)
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="roadAddress" style={{ width: "97%" }} readOnly />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" id="detailAddress" style={{ width: "70%" }} />
              &nbsp;<span style={{ color: 'gray' }}>(상세주소)</span>
            </td>
          </tr>
          <tr>
            <td className="star">전화번호</td>
            <td>
              <input type="number" id="firstNum" style={{ width: "50px" }} />-
              <input type="number" id="midNum" style={{ width: "50px" }} />-
              <input type="number" id="lastNum" style={{ width: "50px" }} />
            </td>
          </tr>
        </tbody>
        <tfoot style={{ textAlign: 'center' }}>
          <tr>
            <td colSpan={2} style={{ border: 'none' }}>
              <input type="submit" value="가입하기" />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}
export default Regist;