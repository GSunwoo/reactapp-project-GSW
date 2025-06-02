import { useEffect, useState } from "react";
import { usePublic } from "../context/PublicContext";
import { Link, useNavigate } from "react-router-dom";
import '../../css/publicboard.css';


function PublicBoard(props) {

  const navigete = useNavigate();
  const { posts } = usePublic();
  const [allPosts, setAllPosts] = useState([]);
  const [pubPosts, setPubPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;



  function selectTime(time) {
    if (time == null) return;
    const now = new Date();

    const pad = (num) => String(num).padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // 0-based
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());

    const today = `${year}-${month}-${day}`;

    const postdate = time.slice(0, 10);
    const posttime = time.slice(11, 16);
    if (today === postdate) {
      return posttime;
    }
    else {
      return postdate;
    }
  }

  const getPublicPost = () => {
    if (posts == null) return;

    return (posts.map((curr) => {
      return (
        <li key={curr.id} style={{ display: "flex", justifyContent: "space-between", margin: '25px' }}>
          <Link to={'./view/' + curr.id} style={{ flexGrow: 1, textDecoration: 'none', height: '25px' }}>
            {curr.title}
          </Link>
          <span style={{ whiteSpace: "nowrap", marginLeft: "10px" }}>
            {selectTime(curr.postTime)}
          </span>
        </li>
      )
    })
    );
  }


  useEffect(() => {
    setAllPosts(getPublicPost());
  }, [posts, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(allPosts.length / postsPerPage));
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    setPubPosts(allPosts.slice(indexOfFirst, indexOfLast));
  }, [allPosts, currentPage]);


  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>공용 게시판</h2>
          </div>
          <div id="two-column">
            <ul style={{ height: '200px' }}>
              {pubPosts}
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                이전
              </button>
              <span style={{ margin: "0 10px" }}>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                다음
              </button>
            </div>
            <button type="button" class="button button-small" onClick={() => { navigete('./write') }} style={{ border: 'none', cursor: 'pointer' }}>새 게시글 작성</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default PublicBoard;