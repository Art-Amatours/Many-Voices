import React from 'react';
import './styles.css';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';

interface Props {
  title: string;
  artist: string;
  numCritiques: number;
  imageURLs: string[];
  tagData: string[][];
}

const ArtworkCard: React.FC<Props> = (props) => (
  <Card>
    <div className="artwork-card">
      <div className="info">
        <div className="info-row">
          <span className="title">{props.title}</span>
          <span className="num-critiques">
            {props.numCritiques} critique{props.numCritiques !== 1 && 's'}
          </span>
        </div>
        <div className="info-row">
          <span className="author">{props.artist}</span>
        </div>
        <div className="tag-row">
          {props.tagData.map(([name, backgroundColor]) => (
            <Tag
              key={name + backgroundColor}
              name={name}
              backgroundColor={backgroundColor}
            />
          ))}
        </div>
      </div>
      <img src={props.imageURLs[0]} alt={`Artwork: ${props.title}`} />
    </div>
  </Card>
);

export default ArtworkCard;
