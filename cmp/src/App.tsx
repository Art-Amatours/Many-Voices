import React, { useEffect } from 'react';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';
import { fetchAllArtworkFromCloud } from './store/artwork/actions';
import ArtworkCard from './components/ArtworkCard/ArtworkCard';

// Change the host that we hit to make API calls depending on if we're running in dev or prod.
let host: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  host = `http://${window.location.hostname.concat(':6969')}`;
} else {
  host = 'public-address-for-some-remote-box';
}

// Redux goodness.

const mapState = (state: RootState) => ({
  artworkList: state.artwork.list,
  isLoadingArtwork: state.artwork.isLoading,
});
const mapDispatch = {
  fetchAllArtworkFromCloud: () => fetchAllArtworkFromCloud(host),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const App: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  // When the app first launches, reach out to the network to fetch all of the
  // content this app will need to display, and throw it in the redux global
  // store.
  useEffect(() => props.fetchAllArtworkFromCloud(), [props]);

  return (
    <>
      {props.isLoadingArtwork && <p>Loading...</p>}
      {!props.isLoadingArtwork && (
        <div className="card-container">
          {props.artworkList.map((artwork) => (
            <ArtworkCard
              title={artwork.title}
              artist={artwork.artist}
              numCritiques={artwork.critiques.length}
              imageURLs={artwork.imageURLs}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default connector(App);
