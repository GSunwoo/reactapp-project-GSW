import { ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../config/firestoreConfig";
import { useAuth } from "../login/AuthContext";
import { useDoc } from "../common/DocContext";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const isImage = (file) => {
  let ext = file.slice(file.lastIndexOf('.') + 1).toLowerCase();
  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff", "tif",
    "ico", "heic", "heif", "dds", "apng", "raw", "cr2", "nef", "arw", "exr"];
  for (let i = 0; i < imageExt.length; i++) {
    if (ext === imageExt[i]) return true;
  }
  return false;
}

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
  const {updateDocId} = useDoc();
  const did = localStorage.getItem('docId');
  const navigate = useNavigate();
  
  const imagePath = 'doc-board/images/';
  const othersPath = 'doc-board/normal-files/';

  const postContents = async (newPost) => {
    await setDoc(doc(firestore, 'doc_post', newPost.id), { ...newPost, writer: itsMe, postTime: nowDate() });
    console.log('입력성공');
    updateDocId();

    navigate('/docboard');
    window.location.reload();
  }

  return (<>
    <form onSubmit={(e) => {
      e.preventDefault();

      if (itsMe == '') {
        alert('로그인이 필요합니다.');
        return;
      }

      let filePath = '';
      const userPath = `${itsMe}/${did}/`;

      if (isImage(e.target.upload.files[0].name)) {
        filePath = imagePath + e.target.upload.files[0].name;
      }
      else {
        filePath = othersPath + e.target.upload.files[0].name;
      }

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

      const fileRef = ref(storage, (userPath+filePath))
      uploadBytes(fileRef, e.target.upload.files[0]).then((snapshot) => {
        alert('업로드 성공', snapshot);
      });
    }}>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" id="title" />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea id="contents"></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input type="file" id="upload" name="myfile" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input type="submit" value='작성하기' />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}

export default DocUpload;