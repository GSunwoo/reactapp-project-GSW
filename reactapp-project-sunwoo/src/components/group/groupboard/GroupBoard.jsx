import { Link, useParams } from "react-router-dom";
import WriteGroup from "./WriteGroup";
import ViewGroupBoard from "./ViewGroupBoard";
import {useAuth} from '../../login/AuthContext';
import {useGroups} from '../../common/GroupContext';
import { useEffect, useState } from "react";

import '../../../css/modal.css';


function GroupBoard(props) {

  const {itsMe} = useAuth();
  const {group} = useGroups();
  const param = useParams();
  const gid = param.id;

  const [nowGroup, setNowGroup] = useState({});

  const getNowGroup = () => {
    if(group==null)return;
    setNowGroup(group.reduce((pg,cg)=>{
      if(cg.id===gid){
        pg = cg;
      }
      return pg;
    },{}));
  }

  useEffect(()=>{
    getNowGroup();
  },[group])

  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>여기는 그룹 게시판</h2>
          </div>
          <div className="container mt-4">
            <WriteGroup gid={gid} nowGroup={nowGroup} />
            <ul className="list-group mt-3" >
              <ViewGroupBoard comments={comments} setComments={setComments} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default GroupBoard;