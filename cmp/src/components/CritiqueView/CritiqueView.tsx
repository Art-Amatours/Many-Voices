import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';

interface Props {
  critique?: Critique | null;
}

const colors = [
  '#5fe382',
  '#3fd9c2',
  '#7589eb',
  '#c55bcf',
  '#a4db81',
  '#e6b04c',
  '#ed9c7b',
];

const CritiqueView: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.critique?.title ?? '');
  const [critic, setCritic] = useState(props.critique?.critic ?? '');
  const [transcript, setTranscript] = useState(
    props.critique?.transcript ?? '',
  );
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState(props.critique?.tags ?? [['', '']]);
  const [newTag, setNewTag] = useState('');
  // const [critiques, setCurrentCritique] = useState(props.artwork?.critiques ?? []);
  // const [newCritique, setNewCritique] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file); // eslint-disable-line no-console
  };

  return (
    <Card>
      <div className="create-artwork-screen-container">
        <span className="create-artwork-header">Add a Critique</span>
        <div className="info-row">
          <p className="title">{title}</p>
        </div>
        <div className="info-row">
          <p className="author">{critic}</p>
        </div>
        <div className="tag-row">
          {tags.map((tag) => (
            <>
              <Tag name={tag[0]} backgroundColor={tag[1]} />
            </>
          ))}
        </div>
        <p className="title">{newTag}</p>

        {/* <img src={imageURLs[0]} alt="artwork" /> */}

        <div className="info-row">
          <textarea readOnly className="Transcript" value={transcript} />
        </div>
      </div>
    </Card>
  );
};

CritiqueView.defaultProps = {
  critique: null,
};

export default CritiqueView;
