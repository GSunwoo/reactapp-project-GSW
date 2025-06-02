import { useEffect, useState } from "react";
import { usePublic } from "../context/PublicContext";
import { Link } from "react-router-dom";

function PublicPageList(props) {
  const { posts } = usePublic();
  const [page, setPage] = useState([]);
  const [pagePosts, setPagePosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

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
    console.log(postdate);
    console.log(today);
    if (today === postdate) {
      return (hours + ':' + minutes);
    }
    else {
      return postdate;
    }
  }

  const getPublicPost = () => {
    if (posts == null) return;

    return (posts.map((curr) => {
      return (
        <li key={curr.id} style={{ display: "flex", justifyContent: "space-between", margin: '10px' }}>
          <Link to={'./view/' + curr.id} style={{ flexGrow: 1 }}>
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
    const allPosts = getPublicPost();
    console.log('all', allPosts);

    if(allPosts==null)return;
    const pagingArr = [[]];
    let i = 0;
    let total = totalPage;
    while(i<allPosts.length){
      for(var j=0; j < 5; j++){
        if(allPosts[i]==null){
          setPagePosts(pagingArr);
          return;
        }
        pagingArr[total][j] = allPosts[i];
        i++;
      }
      total++;
    }
    setTotalPage(total);
    setPagePosts(pagingArr);

    const pageNumber = []
    for(var j=0; j<total+1 ; j++){
      console.log('hi');
      pageNumber.push(
        <span style={{marginRight:'5px'}} onClick={(e)=>{setCurrPage(Number(e.target.innerText))}}>{j+1}</span>
      )
    }
    setPage(pageNumber);
  }, [posts]);


  return (<>
    <ul className="default">
      {pagePosts[currPage-1]}
    </ul>
    {page}
    <br />
  </>); 
}
export default PublicPageList;