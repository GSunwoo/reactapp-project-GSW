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

  return (<>
    <h2>회원가입폼</h2>
    <form action="" className="registForm" style={{margin:'20px'}}>
      <table>
        <colgroup>
          <col width="25%"/>
          <col width="*"/>
        </colgroup>
        <tbody>
          <tr>
            <td className="star">아이디</td>
            <td>
              <input type="text"/>
              <input type="submit" value="중복확인"/>&nbsp;&nbsp;
              <span>+ 4~15자, 첫 영문자, 영문자와 숫자 조합</span>
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td className="star">비밀번호 확인</td>
            <td>
              <input type="text" />
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
            <td className="nostar">생년월일</td>
            <td>
              <input type="radio" name="gender" id="" />남자&nbsp;&nbsp;
              <input type="radio" name="gender" id="" />여자&nbsp;&nbsp;&nbsp;
              <input type="number" name="" id="" style={{width: "70px"}} />년&nbsp;
              <input type="number" name="" id="" style={{width: "50px"}} />월&nbsp;
              <input type="number" name="" id="" style={{width: "50px"}} />일&nbsp;
              <span style={{marginLeft: "20px"}}>(예: 2000년 01월 31일)</span>
            </td>
          </tr>
          <tr>
            <td className="star">이메일</td>
            <td>
              <input type="text" name="" id="" /> @
              <input type="text" name="" id="" />
              &nbsp;
              <select name="" id="">
                <option value="gmail.com">gmail.com</option>
                <option value="">naver.com</option>
                <option value="">daum.net</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="nostar" rowSpan="3">주소</td>
            <td>
              <input type="submit" value="주소찾기" />
              <input type="number" name="" id="" style={{width: "100px"}} /> (우편번호)
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="" id="" style={{width: "97%"}} />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="" id="" style={{width: "70%"}} />
              &nbsp;<span style={{color:'gray'}}>(상세주소)</span> 
            </td>
          </tr>
          <tr>
            <td className="nostar">전화번호</td>
            <td>
              <input type="number" name="" id="" style={{width: "50px"}} />-
              <input type="number" name="" id="" style={{width: "50px"}} />-
              <input type="number" name="" id="" style={{width: "50px"}} />
            </td>
          </tr>
        </tbody>
        <tfoot style={{textAlign:'center'}}>
          <tr>
            <td colSpan={2} style={{border:'none'}}>
              <input type="submit" value="가입하기" />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>); 
}
export default Regist;