import React, { useState } from 'react';
import './styles.css';
import { Artwork } from '../../store/artwork/types';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';
import ArtworkEdit from '../ArtworkEdit/ArtworkEdit';
import ArtworkView from '../ArtworkView/ArtworkView';

interface Props {
  artwork?: Artwork | null;
}

const ArtworkCard: React.FC<Props> = (props) => {
  const [artwork, setArtwork] = useState(props.artwork);
  let critiqueView;
  // =
  //   <CritiqueView critique={critique} />,
  // );
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit || artwork == null) {
    critiqueView = (
      <ArtworkEdit
        artwork={artwork}
        setArtwork={(art: Artwork) => {
          setIsEdit(false);
          setArtwork(art);
        }}
      />
    );
  } else {
    critiqueView = (
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          setIsEdit(true);
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          setIsEdit(true);
        }}>
        <ArtworkView artwork={artwork} />
      </div>
    );
  }

  return critiqueView;
};

export default ArtworkCard;
