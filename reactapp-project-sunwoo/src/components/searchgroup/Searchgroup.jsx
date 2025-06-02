import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGroups } from "../context/GroupContext";
import '../../css/publicboard.css';

function Searchgroup(props) {
  const navigete = useNavigate();
  const { groups } = useGroups();
  const [allGroups, setAllGroups] = useState([]);
  const [pubGroups, setPubGroups] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const groupsPerPage = 5;

  const getPublicPost = () => {
    if (groups == null) return;

    return (groups.map((curr) => {
      return (
        <li key={curr.id} style={{ display: "flex", justifyContent: "space-between", margin: '25px' }}>
          <Link to={'./enter/' + curr.id} style={{ flexGrow: 1, textDecoration: 'none', height: '25px' }}>
            {curr.groupName}
          </Link>
          <span style={{ whiteSpace: "nowrap", marginLeft: "10px" }}>
            {curr.owner}
          </span>
        </li>
      );
    })
    );
  }


  useEffect(() => {
    setAllGroups(getPublicPost());
  }, [groups, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(allGroups.length / groupsPerPage));
    const indexOfLast = currentPage * groupsPerPage;
    const indexOfFirst = indexOfLast - groupsPerPage;
    setPubGroups(allGroups.slice(indexOfFirst, indexOfLast));
  }, [allGroups, currentPage])


  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>그룹검색</h2>
          </div>
          <div id="two-column">
            <ul style={{ height: '200px' }}>
              {pubGroups}
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
export default Searchgroup;