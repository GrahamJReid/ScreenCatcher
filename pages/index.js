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
            <video autoPlay muted loop id="myVideo">
              <source src="https://cdn.dribbble.com/users/707385/screenshots/16066794/media/4b61d36214f8e64912721e79e2f48f8c.mp4" type="video/mp4" />
            </video>
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
            <UserFollowedThreads />
          </div>
        </div>

        <div className="parallax_group outro_screen" id="outro">
          <UserFollowedImages />
        </div>
      </div>
    </>
  );
}

export default Home;
