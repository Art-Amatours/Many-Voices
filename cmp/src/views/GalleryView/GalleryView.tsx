import React from 'react';
import './GalleryView.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

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
          <ArtworkCard
            title={artwork.title}
            artist={artwork.artist}
            numCritiques={artwork.critiques.length}
            imageURLs={artwork.imageURLs}
            tagData={artwork.tags}
          />
        ))}
      </div>
    )}
  </>
);

export default connector(GalleryView);
