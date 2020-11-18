import React, { useEffect } from 'react';
import './styles.css';
import { connect, ConnectedProps } from 'react-redux';
import { fetchAllArtworkFromCloud } from '../../store/artwork/actions';
import GalleryView from '../../views/GalleryView/GalleryView';

// Change the host that we hit to make API calls depending on if we're running in dev or prod.
let host: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  host = `http://${window.location.hostname.concat(':6969')}`;
} else {
  host = 'public-address-for-some-remote-box';
}

// Redux goodness.

const mapDispatch = {
  fetchAllArtworkFromCloud: () => fetchAllArtworkFromCloud(host),
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const ArtworkScreen: React.FC<PropsFromRedux> = (props: PropsFromRedux) => {
  // When the app first launches, reach out to the network to fetch all of the
  // content this app will need to display, and throw it in the redux global
  // store.
  useEffect(() => props.fetchAllArtworkFromCloud(), [props]);

  return <GalleryView />;
};

export default connector(ArtworkScreen);
