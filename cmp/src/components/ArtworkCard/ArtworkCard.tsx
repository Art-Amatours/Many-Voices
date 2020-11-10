import React from 'react';
import './styles.css';
import Card from '../card/Card';

interface Props {
  title: string;
  artist: string;
  numCritiques: number;
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
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '220px',
          background: 'lightgray',
          textAlign: 'center',
          fontSize: '0.8em',
          lineHeight: '1.5',
        }}>
        Image goes here :)
        <br /> Maybe a carousel
      </div>
    </div>
  </Card>
);

export default ArtworkCard;
