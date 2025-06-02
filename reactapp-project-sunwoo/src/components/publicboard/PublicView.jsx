import { Link, useNavigate, useParams } from "react-router-dom";
import { usePublic } from "../context/PublicContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { firestore } from "../../config/firestoreConfig";
import { deleteDoc, doc } from "firebase/firestore";

import '../../css/pubview.css';

function PublicView(props) {

  const navigate = useNavigate();
  const { itsMe } = useAuth();
  const { posts } = usePublic();
  const params = useParams();
  const [myPost, setMyPost] = useState(false);
  const [nowPost, setNowPost] = useState({});

  const pid = params.id;

  useEffect(() => {
    const viewPost = posts.reduce((pp, cp) => {
      if (cp.id == pid) {
        pp = cp;
      }
      return pp;
    }, {});
    setNowPost(viewPost);

    if (itsMe === viewPost.writer) {
      setMyPost(true);
    }
    else {
      setMyPost(false);
    }
  }, [posts, itsMe]);

  return (<>
    <h2 style={{color:'#F67C78'}}>공용 게시판</h2>
    <table className="viewTable">
      <thead>
        <tr>
          <td style={{borderRadius:"10px 0 0 0"}}>제목</td>
          <td colSpan={3} style={{borderRadius:'0 10px 0 0'}}>{nowPost.title}</td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>{nowPost.writer}</td>
          <td style={{backgroundColor:'#ffc4c9', fontWeight:'bold', textAlign:'center', width:'100px'}}>날짜</td>
          <td>{nowPost.postTime}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4} style={{minHeight:'300px', 'whiteSpace':'pre-wrap'}}>{nowPost.contents}</td>
        </tr>
      </tbody>
      {myPost && <tfoot>
        <tr>
          <td>
            <Link to={'/pubboard/edit/' + pid} >수정</Link>
          </td>
          <td>
            <button type="button" onClick={async (e) => {
              if(!confirm('삭제하시겠습니까?'))return;

              e.preventDefault();

              console.log('삭제');
              await deleteDoc(doc(firestore, 'public_post', pid));
              navigate('/pubboard');
              window.location.reload();
            }}>삭제</button>
          </td>
        </tr>
      </tfoot>}
    </table>
  </>);
}
export default PublicView;