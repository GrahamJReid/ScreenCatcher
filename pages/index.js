/* eslint-disable jsx-a11y/alt-text */
import Gallery from '../components/homePage/Gallery';
import UserFollowedImages from '../components/homePage/UserFollowedImages';
import UserFollowedThreads from '../components/homePage/UserFollowedThreads';

/* eslint-disable @next/next/no-img-element */
function Home() {
  return (
    <>
      <div className="parallax_wrapper">
        <div className="parallax_group intro_screen" id="intro">
          <div className="intro-div-container">

            <img src="/logo.png" className="home-logo" />
            <h1 className="intro-title">SCREEN CATCHER</h1>
          </div>
        </div>

        <div className="parallax_group" id="group-1">
          <div className="parallax_layer base_layer">
            <></>
          </div>
          <div className="parallax_layer mid_layer">

            <Gallery />

          </div>
        </div>

        <div className="parallax_group" id="group-2">
          <div className="parallax_layer mid_layer">
            <></>
          </div>
          <div className="parallax_layer top_layer">
            <div>
              <h1 className="followed-threads-title">Followed Threads</h1>
              <UserFollowedThreads />
            </div>
          </div>
        </div>

        <div className="parallax_group outro_screen" id="outro">

          <div className="followed-image-div-container">
            <h1 className="followed-images-title">Followed User Images</h1>
            <UserFollowedImages />
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
