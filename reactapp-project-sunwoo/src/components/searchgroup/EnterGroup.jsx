import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../common/GroupContext";
import { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";
import { firestore } from "../../config/firestoreConfig";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

function EnterGroup (props) {
    const params = useParams();
    const gid = params.id;
    const { groups } = useGroups();
    const [nowGroup, setNowGroup] = useState({});
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const {itsMe} = useAuth();
  
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
  
    const updateGroupMem = async () => {
      await setDoc(doc(firestore, 'groups', gid),{
        ...nowGroup,
        member:[...nowGroup.member, itsMe]
      });
    }

    const enterGroup = async() => {
      for (const curr of members) {
        const currGroup = curr.mygroup;
        await setDoc(doc(firestore, 'members', curr.id), {
          ...curr,
          mygroup: [...currGroup, gid],
        });
      }
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
        <button type="button" onClick={()=>{
            enterGroup();
            updateGroupMem();
        }}>그룹 참가</button>
      </div>
    );
}

export default EnterGroup;