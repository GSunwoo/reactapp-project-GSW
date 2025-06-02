import { useEffect, useState } from "react";
import EditGroupBoard from "./EditGroupBoard";
import '../../../css/modal.css';
import { useGroupBoard } from "../../context/GroupBoardContext";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../config/firestoreConfig";

function ViewGroupBoard(props) {
  const {itsMe} = useAuth();
  const { groupBoard } = useGroupBoard();
  const [lists, setLists] = useState();
  const params = useParams();
  const gid = params.id;

  const gbid = props.gbid;

  useEffect(() => {
    const currGroupBoard = groupBoard.filter(curr=>curr.group==gid);

    const commentsList = currGroupBoard.map((curr) => {
      return (
        <li key={curr.id} className="list-group-item">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <strong>{curr.title}</strong>&nbsp;&nbsp;<span>{curr.writer}</span><small className="ms-2">{curr.postTime}</small>
            </div>
            <div>
              {/* <button className="btn btn-outline-success btn-sm" onClick={(e) => {
                setCommLikes(curr.likes++);
              }}>좋아요 ({curr.likes})</button> */}
              { (itsMe===curr.writer) ?
              <EditGroupBoard gbid={gbid} currentComm={curr} />:<></>}
              { (itsMe===curr.writer) ?
              <button className="btn btn-outline-danger btn-sm"
                onClick={async(e) => {
                  if(!confirm('삭제하시겠습니까?'))return;
                  await deleteDoc(doc(firestore,'group-board', curr.id));
                  window.location.reload();
                }}>삭제</button>:<></>
              }
            </div>
          </div>
          <p className="mt-2 mb-0" style={{ 'whiteSpace': 'pre-wrap' }}>
            {curr.contents}
          </p>
        </li>
      );
    });
    setLists(commentsList);
  }, [groupBoard]);



  return (<>
    {lists}
  </>);
}
export default ViewGroupBoard;