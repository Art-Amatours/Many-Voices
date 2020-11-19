import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import Tag from '../Tag/Tag';

interface Props {
  artwork?: Artwork | null;
}

const EditPopup: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.artwork?.title ?? '');
  const [artist, setArtist] = useState(props.artwork?.artist ?? '');
  const [desc, setDesc] = useState(props.artwork?.description ?? '');
  const [imageURLs, setImageURLS] = useState(props.artwork?.imageURLs ?? ['']);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState(props.artwork?.tags ?? [['', '']]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
  };

  return (
    <div className="create-artwork-screen-container">
      <span className="create-artwork-header">Create a New Artwork</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <img src={imageURLs[0]} alt="artwork" />
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files && e.target.src) {
              setImageURLS([e.target.src]);
              setFile(e.target.files[0]);
            }
          }}
        />
        {tags.map((tag) => (
          <>
            <Tag name={tag[0]} backgroundColor={tag[1]} />
            <input type="button" value="X" />
          </>
        ))}
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

EditPopup.defaultProps = {
  artwork: null,
};

export default EditPopup;
