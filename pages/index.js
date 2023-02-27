/* eslint-disable jsx-a11y/alt-text */
import Gallery from '../components/homePage/Gallery';
import PublicImagesView from '../components/homePage/PublicImagesView';
import { useAuth } from '../utils/context/authContext';

/* eslint-disable @next/next/no-img-element */
function Home() {
  const { user } = useAuth();
  return (
    <>
      <div className="parallax_wrapper">
        <div className="parallax_group intro_screen" id="intro">
          <img src={user.photoURL} height="200" width="200" />
          <h1>{user.displayName}</h1>
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
          outro screen
        </div>
      </div>
    </>
  );
}

export default Home;
