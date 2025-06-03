import { useEffect } from "react";
import '../../../css/modal.css';
import { useGroupBoard } from "../../context/GroupBoardContext";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../config/firestoreConfig";
import { useParams } from "react-router-dom";

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

function WriteGroup(props) {

  const {itsMe} = useAuth(); 
  const { updateGrbId, getGrbId } = useGroupBoard();
  const params = useParams();
  const gid = params.id;
  

  const postContents = async (newPost) => {
    console.log('postContents');
    await setDoc(doc(firestore, 'group-board', newPost.id), { ...newPost, writer: itsMe, postTime: nowDate() });
    console.log('입력성공');
    updateGrbId();
    window.location.reload();
  }

  return (<>
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
      질문 작성
    </button>
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={(e) => {
            e.preventDefault();

            let title = e.target.title.value;
            let contents = e.target.contents.value;
            let groupBId = getGrbId();

            const newPost = { id: groupBId, title: title, contents: contents, group:gid};

            postContents(newPost);

            e.target.contents.value = '';
            e.target.title.value = '';

            
          }}>
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">게시글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {
                document.getElementById('title').value = '';
                document.getElementById('contents').value = '';
              }}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title" placeholder="제목을 입력하세요" />
              </div>
              <label htmlFor="contents" className="form-label">내용</label>
              <textarea className="form-control" id="contents" rows="3" placeholder="내용을 입력하세요"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => {
                document.getElementById('title').value = '';
                document.getElementById('contents').value = '';
              }}>닫기</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">작성</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>);
}
export default WriteGroup;