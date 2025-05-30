import { useState } from "react";
import EditGroupBoard from "./EditGroupBoard";
import '../../../css/modal.css';

function ViewGroupBoard(props) {

  //{id:1, writer:'길동이', body:'오늘은 5월27일', likes:0, time:'2025-05-27 10:55:24'}
  const comments = props.comments;
  const setComments = props.setComments;

  const [commLikes, setCommLikes] = useState();

  const commentsList = comments.map((curr)=>{
    return(
        <li key={curr.id} className="list-group-item">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <strong>{curr.writer}</strong> <small className="ms-2">{curr.time}</small>
                </div>
                <div>
                    <button className="btn btn-outline-success btn-sm" onClick={(e)=>{
                      setCommLikes(curr.likes++);
                    }}>좋아요 ({curr.likes})</button>
                    <EditGroupBoard comments={comments} setComments={setComments} currentComm={curr} />
                    <button className="btn btn-outline-danger btn-sm"
                    onClick={(e)=>{
                      setComments(comments.filter(now=>now.id!=curr.id));
                    }}>삭제</button>
                </div>
            </div>
            <p className="mt-2 mb-0" style={{'whiteSpace':'pre-wrap'}}>
                {curr.body}
            </p>
        </li>
    );
  });

  return (<>
    {commentsList}
  </>); 
}
export default ViewGroupBoard;