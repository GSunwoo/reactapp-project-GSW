import { deleteDoc, doc } from "firebase/firestore";
import { firestore, storage } from "../../config/firestoreConfig";
import { useDoc } from "../common/DocContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const isImage = (file) => {
  let ext = file.slice(file.lastIndexOf('.') + 1).toLowerCase();
  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff", "tif",
    "ico", "heic", "heif", "dds", "apng", "raw", "cr2", "nef", "arw", "exr"];
  for (let i = 0; i < imageExt.length; i++) {
    if (ext === imageExt[i]) return true;
  }
  return false;
}

function DocView(props) {
  const navigate = useNavigate();
  const { itsMe } = useAuth();
  const { docs } = useDoc();
  const params = useParams();
  const did = params.id;
  const [myPost, setMyPost] = useState(false);
  const [nowPost, setNowPost] = useState({});
  const [nowFile, setNowFile] = useState(null);

  const path = itsMe + '/doc-board/' + did + '/';

  const fetchFiles = async () => {
    const listRef = ref(storage, path);  // 원하는 폴더 경로 지정
    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            url: url
          };
        })
      );
      setNowFile(urls[0]);
    } catch (error) {
      console.error("파일 목록 가져오기 실패", error);
    }
  };

  useEffect(() => {
    const viewPost = docs.reduce((pp, cp) => {
      if (cp.id == did) {
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

    fetchFiles();
  }, [docs, itsMe]);

  return (<>
    <h2 style={{ color: '#F67C78' }}>자료 게시판</h2>
    <table className="viewTable">
      <thead>
        <tr>
          <td style={{ borderRadius: "10px 0 0 0" }}>제목</td>
          <td colSpan={3} style={{ borderRadius: '0 10px 0 0' }}>{nowPost.title}</td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>{nowPost.writer}</td>
          <td style={{ backgroundColor: '#ffc4c9', fontWeight: 'bold', textAlign: 'center', width: '100px' }}>날짜</td>
          <td>{nowPost.postTime}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4} style={{ minHeight: '300px', 'whiteSpace': 'pre-wrap' }}>{nowPost.contents}</td>
        </tr>
        <tr>
          <td colSpan={4}>
            {nowFile ? nowFile.name : '...'}
          </td>
        </tr>
      </tbody>
      {myPost && <tfoot>
        <tr>
          <td>
            <Link to={'/docboard/edit/' + did} >수정</Link>
          </td>
          <td>
            <button type="button" onClick={async (e) => {
              if (!confirm('삭제하시겠습니까?')) return;

              e.preventDefault();

              console.log('삭제');
              await deleteDoc(doc(firestore, 'doc_post', did));
              navigate('/docboard');
              window.location.reload();
            }}>삭제</button>
          </td>
        </tr>
      </tfoot>}
    </table>
  </>);
}

export default DocView;