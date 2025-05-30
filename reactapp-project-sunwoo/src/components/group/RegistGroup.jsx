import { useEffect } from "react";
import { useGroups } from "../common/GroupContext";
import { useAuth } from "../login/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firestoreConfig";
import { useNavigate } from "react-router-dom";

import '../../css/groupregi.css';

function RegistGroup(props) {
  const {itsMe, isLoggedIn} = useAuth();
  const {setIdNum, updateIdNum} = useGroups();
  const navigate = useNavigate();

  const gid = localStorage.getItem('groupId')

  const groupRegist = async (newGroup) => {
    console.log('nextId',gid);
    console.log('newGroup',newGroup);
    await setDoc(doc(firestore, 'groups', gid),{...newGroup, owner:itsMe});
    const mySnap = await getDoc(doc(firestore, 'members', itsMe));
    const myData = mySnap.data();
    await setDoc(doc(firestore, 'members', itsMe),{...myData, mygroup:[...myData.mygroup, newGroup.id]});
    updateIdNum();
    alert('그룹등록 완료');
    navigate('/mypage');
    window.location.reload();
  }

  return (
  <div className="wrapper-groupregist">
    <h2>그룹등록</h2>
    <form onSubmit={(e)=>{
      e.preventDefault();

      const comm = (e.target.comment.value=='')? '안녕하세요. 잘 부탁드립니다.':e.target.comment.value;

      const newGroup = {
        id: gid,
        groupName: e.target.groupName.value,
        comment: comm,
        member:[itsMe]
      }

      groupRegist(newGroup);

    }}>
      <table>
        <tbody>
          <tr>
            <th>
              그룹이름
            </th>
            <td>
              <input type="text" id="groupName" required/>
            </td>
          </tr>
          <tr>
            <th>
              그룹소개
            </th>
            <td>
              <textarea name="" id="comment" placeholder="안녕하세요. 잘 부탁드립니다."></textarea>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <input type="submit" value="그룹생성" />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </div>
  ); 
}
export default RegistGroup;