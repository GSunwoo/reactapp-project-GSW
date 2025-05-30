import { Link } from "react-router-dom";
import WriteGroup from "./WriteGroup";
import ViewGroupBoard from "./ViewGroupBoard";
import { useState } from "react";
import '../../../css/modal.css';


function GroupBoard(props) {

  const [idx, setIdx] = useState(2);
  const [comments, setComments] = useState([
    {id:1, writer:'길동이', body:'오늘은 5월27일', likes:0, time:'2025-05-27 10:55:24'}
  ]);

  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>여기는 그룹 게시판</h2>
          </div>
          <div className="container mt-4">
            <WriteGroup comments={comments} setComments={setComments} idx={idx} setIdx={setIdx} />
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