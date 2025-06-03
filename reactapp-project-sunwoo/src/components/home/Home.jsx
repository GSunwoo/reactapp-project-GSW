function Home(props) {
  return (<>
    {/* 메인 */}
    <div id="page-wrapper" style={{backgroundColor:'#ffffff'}}>
      {/* 메인 아티클 */}
      <div id="page" style={{backgroundColor:'#ffffff'}}>
        <div id="content" style={{backgroundColor:'#ffffff'}}>
          <div className="title">
            <h2>당신의 스터디, 함께 만들어보세요!</h2>
          </div>
          <p>
            이 사이트는 다양한 주제의 스터디 그룹을 만들고, 참여하고, 함께 성장할 수 있도록 도와주는 공간입니다.
            관심 있는 주제를 중심으로 그룹을 구성하고, 자유롭게 게시판과 채팅 기능을 통해 소통할 수 있습니다.
            혼자서는 어려웠던 공부, 이제는 함께 해봐요!
          </p>
        </div>
      </div>
    </div>
  </>);
}
export default Home;