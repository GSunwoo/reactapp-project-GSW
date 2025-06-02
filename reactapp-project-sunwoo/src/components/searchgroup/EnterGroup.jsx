import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../context/GroupContext";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../../config/firestoreConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

function EnterGroup(props) {
  const params = useParams();
  const gid = params.id;
  const { groups } = useGroups();
  const [nowGroup, setNowGroup] = useState({});
  const [member, setMember] = useState([]);
  const navigate = useNavigate();
  const { itsMe } = useAuth();

  const getMembers = async () => {
    const querySnapshot = await getDoc(doc(firestore, 'members',itsMe));
    const mem = querySnapshot.data();
    const nowMember = {
      id: mem.id,
      pw: mem.pw,
      name: mem.name,
      email: mem.email,
      zip: mem.zip,
      addr: mem.addr,
      dAddr: mem.dAddr,
      hp: mem.hp,
      mygroup: mem.mygroup,
      time: mem.time
    }
    setMember(nowMember);
  }

  const updateGroupMem = async () => {
    await setDoc(doc(firestore, 'groups', gid), {
      ...nowGroup,
      member: [...nowGroup.member, itsMe]
    });
  }

  const enterGroup = async () => {
    const currGroup = member.mygroup;
    let isExist = false;
    currGroup.forEach(curr => {
      if(curr === gid){
        isExist = true;
        return;
      }
      isExist = false;
    });
    if(isExist){
      alert('이미 참여한 그룹입니다.');
      return;
    }
    await setDoc(doc(firestore, 'members', itsMe), {
      ...member,
      mygroup: [...currGroup, gid],
    });
    navigate('/searchgroup');
    window.location.reload();
  }

  const getGroup = () => {
    if (groups == null) return;
    setNowGroup(groups.reduce((pg, cg) => {
      if (cg.id == gid) {
        pg = cg;
      }
      return pg;
    }, {}));
  }

  useEffect(() => {
    getGroup();
    getMembers();
  }, [groups]);

  return (
    <div className="wrapper-viewgroup">
      <table>
        <thead>
          <tr>
            <th>그룹이름</th>
            {/* <th>그룹원</th> */}
            <td>{nowGroup.groupName}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>그룹소개</th>
            {/* <td>{nowGroup.member.map((curr)=>{
              return <span>{curr},</span>
            })}</td> */}
            <td>{nowGroup.comment}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={() => {
        enterGroup();
        updateGroupMem();
      }}>그룹 참가</button>
    </div>
  );
}

export default EnterGroup;