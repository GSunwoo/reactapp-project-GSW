import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firestoreConfig";
import { useAuth } from "../context/AuthContext";
import { usePublic } from "../context/PublicContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import '../../css/pubedit.css';

function PublicEdit(props) {
  const navigate = useNavigate();
  const { posts } = usePublic();

  const params = useParams();
  const [nowPost, setNowPost] = useState({});

  
  const [nowTitle, setNowTitle] = useState('');
  const [nowContents, setNowContents] = useState('');

  const pid = params.id;

  const postContents = async (newPost) => {
    await setDoc(doc(firestore, 'public_post', pid), { ...nowPost, ...newPost});
    console.log('수정성공');
    alert('수정이 완료되었습니다.');

    navigate('/pubboard/view/'+pid);
    window.location.reload();
  }

  useEffect(()=>{
    const viewPost = posts.reduce((pp, cp)=>{
      if(cp.id == pid){
        pp = cp;
      }
      return pp;
    },{});
    setNowPost(viewPost);
    setNowTitle(viewPost.title);
    setNowContents(viewPost.contents);
  }, [posts])

  return (<>
  <div className="wrapper-pubedit">
    <h2>게시물 수정</h2>
    <form onSubmit={(e) => {
      e.preventDefault();

      const newPost = {
        title: e.target.title.value,
        contents: e.target.contents.value,
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
    }}>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" id="title" value={nowTitle} onChange={(e)=>{setNowTitle(e.target.value)}}/>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea id="contents" value={nowContents} onChange={(e)=>{setNowContents(e.target.value)}}></textarea>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input type="submit" value='수정하기' />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </div>
  </>);
}
export default PublicEdit;