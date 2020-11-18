import React from 'react';
import './styles.css';

const Card: React.FC = (props) => <div className="card">{props.children}</div>;

export default Card;
