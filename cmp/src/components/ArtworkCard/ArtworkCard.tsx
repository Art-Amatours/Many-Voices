import React from 'react';
import './styles.css';
import Card from '../card/Card';

interface Props {
  title: string;
  author: string;
}

const ArtworkCard: React.FC<Props> = (props) => (
  <Card>
    <div className="artwork-card">
      <div className="text">
        <span className="title">{props.title}</span>
        <span>{props.author}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '300px',
          background: 'lightgray',
          textAlign: 'center',
          lineHeight: '1.5',
        }}>
        Image goes here :)
        <br /> Maybe a carousel
      </div>
    </div>
  </Card>
);

export default ArtworkCard;
