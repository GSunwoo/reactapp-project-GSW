import { useParams } from "react-router-dom";
import { useGroups } from "../common/GroupContext";
import { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";

function ViewGroup(props) {
  const params = useParams();
  const gid = params.id;
  const {groups} = useGroups();
  const [nowGroup, setNowGroup] = useState({});


  const getGroup = () => {
    if(groups==null) return;
    setNowGroup(groups.reduce((pg,cg)=>{
      if(cg.id==gid){
        pg = cg;
      }
      return pg;
    }),{});
  }

  useEffect(()=>{
    getGroup();
  },[groups]);

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
  </div>
  ); 
}
export default ViewGroup;