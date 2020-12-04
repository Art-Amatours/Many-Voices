import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';

interface Props {
  critique?: Critique | null;
  setCritique: (critique: Critique) => void;
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

const CritiqueEdit: React.FC<Props> = (props: Props) => {
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="info-row">
            <input
              placeholder="Title"
              className="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="info-row">
            <input
              placeholder="Critic"
              className="author"
              type="text"
              name="artist"
              value={critic}
              onChange={(e) => setCritic(e.target.value)}
            />
          </div>
          {tags.map((tag) => (
            <>
              <Tag
                key={`${tag[0]}${tag[1]}`}
                name={tag[0]}
                backgroundColor={tag[1]}
              />
              <input
                key={`X${tag[0]}${tag[1]}`}
                type="button"
                value="X"
                onClick={() => {
                  setTags(
                    tags
                      .slice(0, tags.indexOf(tag))
                      .concat(tags.slice(tags.indexOf(tag) + 1, tags.length)),
                  );
                }}
              />
            </>
          ))}
          <input
            placeholder="New Tag"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input
            type="button"
            value="+"
            onClick={() => {
              setTags(
                tags.concat([
                  [newTag, colors[Math.floor(Math.random() * colors.length)]],
                ]),
              );
            }}
          />
          {/* <img src={imageURLs[0]} alt="artwork" /> */}
          <input
            type="file"
            name="file"
            onChange={(e) => {
              if (e.target.files) {
                // setImageURLS([URL.createObjectURL(e.target.files[0])]);
                setFile(e.target.files[0]);
              }
            }}
          />
          <div className="info-row">
            <textarea
              placeholder="Transcript"
              className="Transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Save"
            onClick={(e) => {
              e.preventDefault();
              props.setCritique({
                title,
                critic,
                tags,
                audioURL:
                  file != null
                    ? URL.createObjectURL(file)
                    : props.critique?.audioURL ?? '',
                transcript,
                audioFile: file,
              });
            }}
          />
        </form>
      </div>
    </Card>
  );
};

CritiqueEdit.defaultProps = {
  critique: null,
};

export default CritiqueEdit;
