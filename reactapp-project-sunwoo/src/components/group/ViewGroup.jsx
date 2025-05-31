import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../common/GroupContext";
import { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";
import { firestore } from "../../config/firestoreConfig";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";


const openChatWin = () => {

  window.open(`/group/groupchat`, 'mychat'
    , 'width=300,height=500');
}

function ViewGroup(props) {
  const params = useParams();
  const gid = params.id;
  const { groups } = useGroups();
  const [nowGroup, setNowGroup] = useState({});
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const deleteFromArr = (arr, delElement) => {
    const newArr = arr.filter(curr=>curr!=delElement);
    return newArr;
  }

  const getMembers = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    const allMembers = [];
    querySnapshot.forEach((curr)=>{
      const mem = curr.data();
      allMembers.push({
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
      });
    });
    setMembers(allMembers);
  }

  const deleteGroup = async () => {
    await deleteDoc(doc(firestore, 'groups', gid));
    
  }

  const updateMember = async() => {
    for (const curr of members) {
      const newMemGroup = deleteFromArr(curr.mygroup, gid);
      await setDoc(doc(firestore, 'members', curr.id), {
        ...curr,
        mygroup: [...newMemGroup],
      });
    }
    navigate('/mypage');
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
      <button type="button" onClick={()=>{navigate("/groupboard/"+gid)}}>그룹 게시판</button>
      <button type="button" onClick={openChatWin}>그룹 채팅</button>
      <button type="button" onClick={()=>{
        if(!confirm('삭제하시겠습니까?'))return;
        deleteGroup();
        updateMember();
      }}>그룹 삭제</button>
    </div>
  );
}
export default ViewGroup;