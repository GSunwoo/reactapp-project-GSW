import { Link } from "react-router-dom";

function Mypage(props) {
  return (<>
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>여기는 마이페이지</h2>
          </div>
          <p>테스트용.</p>
          <div id="two-column">
            <div class="box1">
              <ul class="default">
                <li><Link to='/groupboard'>내 그룹</Link></li>
                <li><a href="#">내정보2</a></li>
                <li><a href="#">내정보3</a></li>
              </ul><a href="#" class="button button-small">ㅇㅋ</a>
            </div>
            <div class="box2">
              <ul class="default">
                <li><a href="#">Vestibulum luctus venenatis dui</a></li>
                <li><a href="#">Integer rutrum nisl in mi</a></li>
                <li><a href="#">Etiam malesuada rutrum enim</a></li>
                <li><a href="#">Aenean elementum facilisis ligula</a></li>
                <li><a href="#">Ut tincidunt elit vitae augue</a></li>
              </ul><a href="#" class="button button-small">Etiam posuere</a>
            </div>
          </div>
        </div>

        {/* 사이드 */}
        <div id="sidebar">
          <div class="title">
            <h2>Sidebar</h2>
          </div>
          <ul class="default">
            <li><a href="#">Vestibulum luctus venenatis dui</a></li>
            <li><a href="#">Integer rutrum nisl in mi</a></li>
            <li><a href="#">Etiam malesuada rutrum enim</a></li>
            <li><a href="#">Etiam malesuada rutrum enim</a></li>
            <li><a href="#">Aenean elementum facilisis ligula</a></li>
            <li><a href="#">Ut tincidunt elit vitae augue</a></li>
          </ul>
          <div class="section">
            <h3>Aenean elementum facilisis</h3>
            <p>Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum.</p>
            <a href="#" class="button button-small">Etiam posuere</a>
          </div>
        </div>
      </div>
    </div>
  </>);
}
export default Mypage;