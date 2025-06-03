import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../config/firestoreConfig";
import { useAuth } from "../context/AuthContext";
import { useDoc } from "../context/DocContext";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DocEdit(props) {
  const { itsMe } = useAuth();
  const { docs } = useDoc();
  const params = useParams();
  const did = params.id;

  const [nowDoc, setNowDoc] = useState(null);
  const [path, setPath] = useState(null);
  const [selectNew, setSelectNew] = useState(false);
  const [nowFile, setNowFile] = useState('');

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

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
  }, [docs]);

  useEffect(()=>{
    if(!nowDoc)return;
    setTitle(nowDoc.title);
    setContents(nowDoc.contents);
    setPath(nowDoc.writer + boardPath + did + '/' +nowDoc.file);
  },[nowDoc]);

  const postContents = async (newPost) => {
    console.log('postContents');
    await setDoc(doc(firestore, 'doc_post', nowDoc.id), { ...nowDoc, ...newPost });
    console.log('입력성공');
  }

  const editFile = async (file) => {
    console.log('path',path);
    const deleteFileRef = ref(storage, path);
    await deleteObject(deleteFileRef).catch(console.log('삭제할거 없음'));
    const uploadFileRef = ref(storage, (nowDoc.writer + boardPath + did + '/'+nowFile))
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

      let newPost;
      if(selectNew){
        let filePath = e.target.fileInput.files[0].name;
        newPost = {
          title: e.target.title.value,
          contents: e.target.contents.value,
          file: filePath
        }
      }
      else{
        newPost = {
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

      postContents(newPost).then(()=>{
          if(selectNew){
            navigate('/loading');
            editFile(e.target.fileInput.files[0]);
          }
          else{
            navigate('/docboard');
            window.location.reload();
          }
        }
      );
    }}>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" id="title" value={title} onChange={(e)=>{setTitle(e.target.value);}}/>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea id="contents" value={contents} onChange={(e)=>{setContents(e.target.value);}}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input type="file" id="fileInput" hidden onChange={(e)=>{setSelectNew(true); console.log(selectNew); setNowFile(e.target.files[0].name)}}/>
              <label htmlFor="fileInput" style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  backgroundColor: '#F67C78',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: '0.9em'
                }
              }>파일 선택</label>
              {selectNew ? <span>{nowFile}</span>: (nowDoc?<span>{nowDoc.file}</span>:<span>loading...</span>)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input type="submit" value='수정하기' />
            </td>
            <td>
              <button type="button" onClick={()=>{navigate(-1)}}>취소</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}

export default DocEdit;