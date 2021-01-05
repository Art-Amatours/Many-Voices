import React from 'react';
import './styles.css';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';
import { Artwork } from '../../store/artwork/types';

interface Props {
  artwork: Artwork;
  // title: string;
  // artist: string;
  // imageURLs: string[];
  // tagData: string[][];
}

const ArtworkView: React.FC<Props> = (props) => (
  <Card>
    <div className="artwork-card">
      <div className="info">
        <div className="info-row">
          <span className="title">{props.artwork.title}</span>
          <span className="num-critiques">
            {props.artwork.critiques.length} critique
            {props.artwork.critiques.length !== 1 && 's'}
          </span>
        </div>
        <div className="info-row">
          <span className="author">{props.artwork.artist}</span>
        </div>
        <div className="tag-row">
          {props.artwork.tags.map(([name, backgroundColor]) => (
            <Tag
              key={name + backgroundColor}
              name={name}
              backgroundColor={backgroundColor}
            />
          ))}
        </div>
      </div>
      <img
        src={props.artwork.imageURLs[0]}
        alt={`Artwork: ${props.artwork.title}`}
      />
    </div>
  </Card>
);

export default ArtworkView;
