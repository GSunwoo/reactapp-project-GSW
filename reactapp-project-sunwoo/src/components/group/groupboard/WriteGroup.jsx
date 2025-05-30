import { useEffect } from "react";
import '../../../css/modal.css';

function WriteGroup(props) {

  //{id:1, writer:'길동이', body:'오늘은 5월27일', likes:0, time:'2025-05-27 10:55:24'}
  const comments = props.comments;
  const setComments = props.setComments;
  const idx = props.idx;
  const setIdx = props.setIdx;

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

  return (<>
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
      댓글 작성
    </button>
    <form onSubmit={(e) => {
      e.preventDefault();

      let commWriter = e.target.commentAuthor.value;
      let commBody = e.target.commentContent.value;

      const newComment = { id: idx, writer: commWriter, body: commBody, likes: 0, time: nowDate() };

      setComments([...comments, newComment]);
      setIdx(idx + 1);

      e.target.commentAuthor.value = '';
      e.target.commentContent.value = '';
    }}>
      <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {
                document.getElementById('commentAuthor').value = '';
                document.getElementById('commentContent').value = '';
              }}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
              </div>
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => {
                document.getElementById('commentAuthor').value = '';
                document.getElementById('commentContent').value = '';
              }}>닫기</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">작성</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>);
}
export default WriteGroup;