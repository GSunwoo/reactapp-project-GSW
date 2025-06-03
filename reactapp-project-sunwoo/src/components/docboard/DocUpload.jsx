import { ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../config/firestoreConfig";
import { useAuth } from "../context/AuthContext";
import { useDoc } from "../context/DocContext";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import '../../css/docupload.css';

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

function DocUpload(props) {
  const { itsMe } = useAuth();
  const { updateDocId, setDocId } = useDoc();
  const did = localStorage.getItem('docId');
  const navigate = useNavigate();

  const boardPath = 'doc-board/';

  setDocId();

  const postContents = async (newPost) => {
    console.log('postContents');
    await setDoc(doc(firestore, 'doc_post', newPost.id), { ...newPost, writer: itsMe, postTime: nowDate() });
    console.log('입력성공');
    updateDocId();
  }

  return (
    <div class="wrapper-docup">
      <form class="form-docup" onSubmit={(e) => {
        e.preventDefault();

        if (itsMe == '') {
          alert('로그인이 필요합니다.');
          return;
        }

        const userPath = itsMe + '/' + boardPath + did + '/';
        let filePath = e.target.upload.files[0].name;

        const newPost = {
          id: did,
          title: e.target.title.value,
          contents: e.target.contents.value,
          file: filePath
        }

        if (newPost.title === '') {
          alert('제목을 입력하세요');
          return;
        }

        if (newPost.contents === '') {
          alert('내용을 입력하세요');
          return;
        }

        postContents(newPost);
        filePath = userPath + filePath;

        const fileRef = ref(storage, filePath);

        navigate('/loading');

        uploadBytes(fileRef, e.target.upload.files[0]).then((snapshot) => {
          alert('업로드 성공', snapshot);
          navigate('/docboard');
          window.location.reload();
        });
      }}>
        <h2>자료 게시판</h2>
        <table class="table-docup">
          <tbody>
            <tr>
              <th>제목</th>
              <td><input type="text" id="title" /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea id="contents"></textarea></td>
            </tr>
            <tr>
              <th>파일</th>
              <td>
                <input type="file" id="upload" name="myfile" style={{border:'none', height:'50px'}}/>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{backgroundColor:'#fff5f5'}}>
              <td colSpan="2">
                <input type="submit" value="작성하기" />
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}

export default DocUpload;