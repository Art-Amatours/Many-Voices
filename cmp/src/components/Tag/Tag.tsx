import React from 'react';
import './styles.css';

interface Props {
  name: string;
  backgroundColor: string;
}

const Tag: React.FC<Props> = (props) => (
  <span className="tag" style={{ background: props.backgroundColor }}>
    {props.name}
  </span>
);

export default Tag;
