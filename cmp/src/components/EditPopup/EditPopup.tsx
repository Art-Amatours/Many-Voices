import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';

interface Props {
  artwork?: Artwork | null;
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

const EditPopup: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.artwork?.title ?? '');
  const [artist, setArtist] = useState(props.artwork?.artist ?? '');
  const [desc, setDesc] = useState(props.artwork?.description ?? '');
  const [imageURLs, setImageURLS] = useState(props.artwork?.imageURLs ?? ['']);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState(props.artwork?.tags ?? [['', '']]);
  const [newTag, setnewTag] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
  };

  return (
    <Card>
      {/* <div className="create-artwork-screen-container">
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
            <Tag name={name} backgroundColor={backgroundColor} />
          ))}
        </div>
      </div>
      <img src={props.imageURLs[0]} alt={`Artwork: ${props.title}`} />
    </div>
 */}

      <div className="create-artwork-screen-container">
        <span className="create-artwork-header">Create a New Artwork</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="info-row">
            <input
              className="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="info-row">
            <input
              className="author"
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          {tags.map((tag) => (
            <>
              <Tag name={tag[0]} backgroundColor={tag[1]} />
              <input
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
            className="title"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setnewTag(e.target.value)}
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
          <img src={imageURLs[0]} alt="artwork" />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              if (e.target.files) {
                setImageURLS([URL.createObjectURL(e.target.files[0])]);
                setFile(e.target.files[0]);
              }
            }}
          />
          <div className="info-row">
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    </Card>
  );
};

EditPopup.defaultProps = {
  artwork: null,
};

export default EditPopup;
