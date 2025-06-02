import { Link, useParams } from "react-router-dom";
import WriteGroup from "./WriteGroup";
import ViewGroupBoard from "./ViewGroupBoard";
import {useAuth} from '../../context/AuthContext';
import {useGroups} from '../../context/GroupContext';
import { useEffect, useState } from "react";

import '../../../css/modal.css';


function GroupBoard(props) {

  const params = useParams();
  const gbid = params.id;

  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>여기는 그룹 게시판</h2>
          </div>
          <div className="container mt-4">
            <WriteGroup gbid={gbid} />
            <ul className="list-group mt-3" >
              <ViewGroupBoard gbid={gbid} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default GroupBoard;