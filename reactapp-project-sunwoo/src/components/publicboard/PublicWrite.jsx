import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firestoreConfig";
import { useAuth } from "../context/AuthContext";
import { usePublic } from "../context/PublicContext";
import { useNavigate } from "react-router-dom";
import '../../css/pubwrite.css';

function PublicWrite(props) {
  const navigate = useNavigate();
  const { itsMe } = useAuth();
  const { getPubId, updatePubId } = usePublic();

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

  const postContents = async (newPost) => {
    await setDoc(doc(firestore, 'public_post', newPost.id), { ...newPost, writer: itsMe, postTime: nowDate() });
    console.log('입력성공');
    updatePubId();
    alert('입력이 완료되었습니다.');

    navigate('/pubboard');
    window.location.reload();
  }

  return (<>
    <form onSubmit={(e) => {
      e.preventDefault();

      const newPost = {
        id: getPubId(),
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
      <table className="wrapper-pubwrite">
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
        </tbody>
        <tfoot>
          <tr>
            <td style={{backgroundColor:'#fff5f5'}}>
              <input type="submit" value='작성하기' />
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </>);
}
export default PublicWrite;