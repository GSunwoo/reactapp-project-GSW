import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../common/GroupContext";
import { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";

const openChatWin = () => {

  window.open(`/group/groupchat`, 'mychat'
    , 'width=300,height=500');
}

function ViewGroup(props) {
  const params = useParams();
  const gid = params.id;
  const { groups } = useGroups();
  const [nowGroup, setNowGroup] = useState({});
  const navigate = useNavigate();


  const getGroup = () => {
    if (groups == null) return;
    setNowGroup(groups.reduce((pg, cg) => {
      if (cg.id == gid) {
        pg = cg;
      }
      return pg;
    }), {});
  }

  useEffect(() => {
    getGroup();
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
    </div>
  );
}
export default ViewGroup;