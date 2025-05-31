import { useState } from "react";
import '../../../css/modal.css';

function EditGroupBoard(props) {
  const comments = props.comments;
  const setComments = props.setComments;
  const currentComm = props.currentComm;

  const [commBody, setCommBody] = useState(currentComm.body);

  function nowDate() {
    const now = new Date();

    const pad = (num) => String(num).padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // 0-based
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  console.log('current', currentComm);
  return (<>
    <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target={"#editModal" + currentComm.id}>
      수정
    </button>
    <form onSubmit={(e) => {
      e.preventDefault();

      const editComment = { id: currentComm.id, writer: currentComm.writer, body: commBody, likes: currentComm.likes, time: nowDate() + '(수정됨)' };

      const newList = comments.map((curr) => {
        if (curr.id === currentComm.id) {
          return editComment;
        }
        return curr;
      });

      setComments(newList);

    }} style={{ 'display': 'inline-block' }}>
      <div className="modal fade" id={"editModal" + currentComm.id} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">댓글 수정</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                <input type="text" className="form-control" id="commentAuthor" value={currentComm.writer} readOnly />
              </div>
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3"
                placeholder="댓글을 입력하세요" value={commBody}
                onChange={(e) => {
                  setCommBody(e.target.value);
                }}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">수정</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>);
}
export default EditGroupBoard;