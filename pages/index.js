/* eslint-disable jsx-a11y/alt-text */
import Gallery from '../components/homePage/Gallery';
import PublicImagesView from '../components/homePage/PublicImagesView';
import UserFollowedImages from '../components/homePage/UserFollowedImages';
import { useAuth } from '../utils/context/authContext';

/* eslint-disable @next/next/no-img-element */
function Home() {
  const { user } = useAuth();
  return (
    <>
      <div className="parallax_wrapper">
        <div className="parallax_group intro_screen" id="intro">
          <div className="intro-div-container">
            <h1 className="intro-title">SCREEN CATCHER</h1>
            <img src={user.photoURL} height="200" width="200" />
            <h1>{user.displayName}</h1>
            <p>welcome</p>
          </div>
        </div>

        <div className="parallax_group" id="group-1">
          <div className="parallax_layer base_layer">
            base layer page
          </div>
          <div className="parallax_layer mid_layer">
            <Gallery />
          </div>
        </div>

        <div className="parallax_group" id="group-2">
          <div className="parallax_layer mid_layer">
            <div>mid Layer</div>
          </div>
          <div className="parallax_layer top_layer">
            <PublicImagesView />
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
