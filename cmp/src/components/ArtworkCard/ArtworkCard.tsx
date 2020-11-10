import React from 'react';
import './styles.css';
import Card from '../card/Card';

interface Props {
  title: string;
  author: string;
  numCritiques: number;
}

const ArtworkCard: React.FC<Props> = (props) => (
  <Card>
    <div className="artwork-card">
      <div className="info">
        <div className="info-row">
          <span className="title">{props.title}</span>
          <span className="num-critiques">{props.numCritiques} critiques</span>
        </div>
        <div className="info-row">
          <span className="author">{props.author}</span>
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
