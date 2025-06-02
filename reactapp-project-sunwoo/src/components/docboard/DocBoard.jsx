import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../config/firestoreConfig";
import { useDoc } from "../context/DocContext";
import { useEffect, useState } from "react";

function selectTime(time) {
  if (time == null) return;
  const now = new Date();

  const pad = (num) => String(num).padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // 0-based
  const day = pad(now.getDate());

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

function DocBoard(props) {
  const navigete = useNavigate();
  const { docs } = useDoc();
  const [allPosts, setAllPosts] = useState([]);
  const [pubPosts, setPubPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;

  const getDocPost = () => {
    if (docs == null) return;
    return (docs.map((curr) => {
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
    setAllPosts(getDocPost());
    console.log(docs);
  }, [docs, currentPage]);

  useEffect(() => {
    if(allPosts.length!=0){
      setTotalPages(Math.ceil(allPosts.length / postsPerPage));
    }
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
            <h2>자료 게시판</h2>
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
            <button type="button" class="button button-small" onClick={() => { navigete('./upload') }} style={{ border: 'none', cursor: 'pointer' }}>새 게시글 작성</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default DocBoard;