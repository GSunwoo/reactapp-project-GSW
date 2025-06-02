import { useState } from "react";
import '../../../css/modal.css';
import { useGroupBoard } from "../../context/GroupBoardContext";
import { collection, doc, query, setDoc } from "firebase/firestore";
import { firestore } from "../../../config/firestoreConfig";

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

function EditGroupBoard(props) {

  const currentComm = props.currentComm;

  const [title, setTitle] = useState(currentComm.title);
  const [contents, setContents] = useState(currentComm.contents);

  const editContents = async (newPost) => {
    await setDoc(doc(firestore,'group-board',currentComm.id),{...currentComm, ...newPost});
    window.location.reload();
  }

  console.log('current', currentComm);
  return (<>
    <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={"#editModal" + currentComm.id}>
      수정
    </button>
    <div className="modal fade" id={"editModal" + currentComm.id} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form style={{ 'display': 'inline-block' }} onSubmit={(e) => {
            e.preventDefault();

            const editPost = {
              title: e.target.title.value,
              contents: e.target.contents.value
            };

            editContents(editPost)

          }}>
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">질문 수정</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{
                  setTitle(e.target.value);
                }} />
              </div>
              <label htmlFor="contents" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="contents" rows="3"
                placeholder="내용을 입력하세요" value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">수정</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>);
}
export default EditGroupBoard;