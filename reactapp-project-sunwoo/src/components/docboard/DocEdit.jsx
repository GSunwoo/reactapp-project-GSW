import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../config/firestoreConfig";
import { useAuth } from "../context/AuthContext";
import { useDoc } from "../context/DocContext";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

function DocEdit(props) {
  const { itsMe } = useAuth();
  const { docs } = useDoc();
  const params = useParams();
  const did = params.id;

  const [nowDoc, setNowDoc] = useState({});
  const [path, setPath] = useState(null);
  const [selectNew, setSelectNew] = useState(false);

  const navigate = useNavigate();

  const boardPath = '/doc-board/';


  const getNowDoc = () => {
    if (!docs) return;
    setNowDoc(docs.reduce((pd, cd) => {
      if (cd.id == did) {
        pd = cd;
      }
      return pd;
    }, {}));
  }

  useEffect(() => {
    getNowDoc();

    if (nowDoc) {
      setPath(nowDoc.writer + boardPath + '/' + nowDoc.file);
    }
  }, [docs]);

  useEffect(() => {

  }, [path])

  const postContents = async (newPost) => {
    console.log('postContents');
    await setDoc(doc(firestore, 'doc_post', newPost.id), { ...nowDoc, ...newPost });
    console.log('입력성공');
  }

  const editFile = async (file) => {
    const deleteFileRef = ref(storage, path);
    await deleteObject(deleteFileRef);
    const uploadFileRef = ref(storage, (nowDoc.writer + boardPath + '/'))
    await uploadBytes(uploadFileRef, file);
    
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

      const userPath = itsMe + '/' + boardPath + '/' + did + '/';
      let filePath = e.target.upload.files[0].name;
      let newPost;
      if(selectNew){
        newPost = {
          id: did,
          title: e.target.title.value,
          contents: e.target.contents.value,
          file: filePath
        }
      }
      else{
        newPost = {
          id: did,
          title: e.target.title.value,
          contents: e.target.contents.value,
        }
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

      navigate('/loading');
      if(selectNew){
        editFile(e.target.upload.files[0]);
      }
      else{
        navigate('/docboard');
        window.location.reload();
      }
    }}>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" id="title" value={nowDoc.title} />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea id="contents" value={nowDoc.contents}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input type="file" id="upload" name="myfile" onChange={()=>{
                setSelectNew(true);
              }}/>
              {selectNew ? <></>: <span>{nowDoc.file}</span>}
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

export default DocEdit;