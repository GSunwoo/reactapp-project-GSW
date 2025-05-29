import { Link } from "react-router-dom";
import { firestore } from "../../config/firestoreConfig";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../login/AuthContext";
import { useEffect, useState } from "react";

import '../../css/mypage.css'

function Mypage(props) {

  const { itsMe, isLoggedIn } = useAuth();
  const [nowData, setNowData] = useState({});
  console.log(itsMe, isLoggedIn);

  const getCollection = async () => {
    const querySnapshot = await getDoc(doc(firestore, 'members', itsMe));
    let myData = querySnapshot.data();
    setNowData(myData);
  }

  useEffect(() => {
    getCollection();
  }, [itsMe, isLoggedIn]);

  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>내 정보</h2>
          </div>
          <div>
            <table id='mypageTb'>
              <colgroup>
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <td className="star">아이디</td>
                  <td>
                    {nowData.id}
                  </td>
                </tr>
                <tr>
                  <td className="star">이름</td>
                  <td>
                    {nowData.name}
                  </td>
                </tr>
                <tr>
                  <td className="star">이메일</td>
                  <td>
                    {nowData.email}
                  </td>
                </tr>
                <tr>
                  <td className="star" rowSpan="3">주소</td>
                  <td>
                    {nowData.zip}
                  </td>
                </tr>
                <tr>
                  <td>
                    {nowData.addr}
                  </td>
                </tr>
                <tr>
                  <td>
                   {nowData.dAddr}
                  </td>
                </tr>
                <tr>
                  <td className="star">전화번호</td>
                  <td>
                    {nowData.hp}
                  </td>
                </tr>
              </tbody>
              <tfoot style={{ textAlign: 'center' }}>
                <tr>
                  <td colSpan={2} style={{ border: 'none' }}>
                    <Link to='/edit/member' className="edit">정보 수정</Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 사이드 */}
        <div id="sidebar">
          <div class="title">
            <h2>Sidebar</h2>
          </div>
          <ul class="default">
            <li><a href="#">Vestibulum luctus venenatis dui</a></li>
            <li><a href="#">Integer rutrum nisl in mi</a></li>
            <li><a href="#">Etiam malesuada rutrum enim</a></li>
            <li><a href="#">Etiam malesuada rutrum enim</a></li>
            <li><a href="#">Aenean elementum facilisis ligula</a></li>
            <li><a href="#">Ut tincidunt elit vitae augue</a></li>
          </ul>
          <div class="section">
            <h3>Aenean elementum facilisis</h3>
            <p>Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum.</p>
            <a href="#" class="button button-small">Etiam posuere</a>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default Mypage;