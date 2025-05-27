function Home(props) {
  return (<>
    {/* 메인 */}
    <div id="page-wrapper">
      {/* 메인 아티클 */}
      <div id="page" class="container">
        <div id="content">
          <div class="title">
            <h2>Maecenas luctus lectus at sapien</h2>
          </div>
          <p>Vestibulum imperdiet, magna nec eleifend rutrum, nunc lectus vestibulum velit, euismod lacinia quam nisl id
            lorem. Quisque erat. Vestibulum pellentesque, justo mollis pretium suscipit, justo nulla blandit libero, in
            blandit augue justo quis nisl. Fusce mattis viverra elit. Fusce quis tortor. In posuere eleifend odio. Quisque
            semper augue mattis wisi. Maecenas ligula.</p>
          <div id="two-column">
            <div class="box1">
              <ul class="default">
                <li><a href="#">Vestibulum luctus venenatis dui</a></li>
                <li><a href="#">Integer rutrum nisl in mi</a></li>
                <li><a href="#">Etiam malesuada rutrum enim</a></li>
                <li><a href="#">Aenean elementum facilisis ligula</a></li>
                <li><a href="#">Ut tincidunt elit vitae augue</a></li>
              </ul><a href="#" class="button button-small">Etiam posuere</a>
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

    {/* 추가 */}
    <div class="wrapper">
      <div id="three-column" class="container">
        <div id="tbox1">
          <div class="title">
            <h2>Maecenas luctus</h2>
          </div>
          <p>Nullam non wisi a sem semper eleifend. Donec mattis libero eget urna. Duis pretium velit ac suscipit mauris.
            Proin eu wisi suscipit nulla suscipit interdum.</p>
          <a href="#" class="button">Learn More</a>
        </div>
        <div id="tbox2">
          <div class="title">
            <h2>Integer gravida</h2>
          </div>
          <p>Proin eu wisi suscipit nulla suscipit interdum. Nullam non wisi a sem semper suscipit eleifend. Donec mattis
            libero eget urna. Duis velit ac mauris.</p>
          <a href="#" class="button">Learn More</a>
        </div>
        <div id="tbox3">
          <div class="title">
            <h2>Praesent mauris</h2>
          </div>
          <p>Donec mattis libero eget urna. Duis pretium velit ac mauris. Proin eu wisi suscipit nulla suscipit interdum.
            Nullam non wisi a sem suscipit eleifend.</p>
          <a href="#" class="button">Learn More</a>
        </div>
      </div>

    </div>


    {/* 추가 */}
    <div id="wrapper2">
      <div class="container">
        <div class="title">
          <h2>Welcome to our website</h2>
        </div>
        <p>This is <strong>Soft String</strong>, a free, fully standards-compliant CSS template designed by <a
          href="http://templated.co" rel="nofollow">TEMPLATED</a>. The photos in this template are from <a
            href="http://fotogrph.com/"> Fotogrph</a>. This free template is released under the <a
              href="http://templated.co/license">Creative Commons Attribution</a> license, so you're pretty much free to do
          whatever you want with it (even use it commercially) provided you give us credit for it. Have fun :) </p>
      </div>
    </div>
  </>); 
}
export default Home;