import { Link } from "react-router-dom";
import { firestore } from "../../config/firestoreConfig";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import '../../css/mypage.css'
import { useGroups } from "../context/GroupContext";

function Mypage(props) {

  const { itsMe, isLoggedIn } = useAuth();
  const { groups } = useGroups();
  const [nowData, setNowData] = useState({});
  const [myGroups, setMygroups] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const getMember = async () => {
    if(itsMe===''){
      return;
    }
    const querySnapshot = await getDoc(doc(firestore, 'members', itsMe));
    let myData = querySnapshot.data();
    setNowData(myData);
    setTrigger(!trigger);
  }

  useEffect(() => {
    getMember();
  }, [itsMe, isLoggedIn]);

  useEffect(()=>{
    if(Object.keys(nowData).length === 0) return;
    console.log('nowData',nowData);
    getMyGroups();
  }, [trigger]);

  const getMyGroups = () => {
    console.log('nowmyg',nowData.mygroup);
    if(nowData.mygroup===null)return;
    
    const groupLi = [];
    console.log(nowData);
    for(let i = 0; i<nowData.mygroup.length; i++){
      groups.map((curr)=>{
        if(nowData.mygroup[i]==curr.id){
          groupLi.push(
            <li key={curr.groupName+curr.id}>
              <Link to={'/group/view/'+curr.id}>{curr.groupName}</Link>
            </li>
          );
        }
      });
    }
    console.log(groupLi);
    setMygroups(groupLi);
  }

  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" className="container">
        <div id="content">
          <div className="title">
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
              <tfoot style={{ textAlign: 'center'}}>
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
          <div className="title">
            <h2>내 그룹</h2>
          </div>
          <ul className="default">
            {myGroups}
          </ul>
          <div className="section">
            <Link to="/group/regist" className="button button-small">그룹 만들기</Link>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default Mypage;