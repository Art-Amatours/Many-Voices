import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';
// import EditPopup from '../../components/ArtworkEdit/ArtworkEdit';

// Redux goodness.

const mapState = (state: RootState) => ({
  artworkList: state.artwork.list,
  isLoadingArtwork: state.artwork.isLoading,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component.

const GalleryView: React.FC<PropsFromRedux> = (props) => (
  <>
    {props.isLoadingArtwork && <span>Loading...</span>}
    {!props.isLoadingArtwork && (
      <div className="card-container">
        {props.artworkList.map((artwork) => (
          <ArtworkCard key={artwork.title + artwork.artist} artwork={artwork} />
        ))}
        {/* <EditPopup artwork={null} /> */}
      </div>
    )}
  </>
);

export default connector(GalleryView);
