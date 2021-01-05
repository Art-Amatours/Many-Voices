import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import { uploadArtworkToCloud } from '../../store/artwork/actions';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';
import CritiqueComponent from '../CritiqueComponent/CritiqueComponent';
import EmptyArtwork from '../../data/images/EmptyArtwork.png';
import Delete from '../../data/images/Delete.png';

interface Props {
  artwork?: Artwork | null;
  setArtwork: (artwork: Artwork) => void;
}

let host: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  host = `http://${window.location.hostname.concat(':6969')}`;
} else {
  host = 'public-address-for-some-remote-box';
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
  const [description, setDescription] = useState(
    props.artwork?.description ?? '',
  );
  const [imageURLs, setImageURLS] = useState(
    props.artwork?.imageURLs ?? [EmptyArtwork],
  );
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState(props.artwork?.tags ?? []);
  const [newTag, setNewTag] = useState('');
  const [critiques, setCritiques] = useState(props.artwork?.critiques ?? []);
  // const [newCritique, setNewCritique] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file); // eslint-disable-line no-console
  };

  console.log(props.artwork?.objectPath); // eslint-disable-line no-console

  return (
    <Card>
      <div className="create-artwork-screen-container">
        <span className="create-artwork-header">Create or Edit Artwork</span>
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
              placeholder="Artist"
              className="author"
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="tag-row">
            {tags.map((tag) => (
              <div className="deletable">
                <Tag
                  key={`${tag[0]}${tag[1]}`}
                  name={tag[0]}
                  backgroundColor={tag[1]}
                />
                <input
                  key={`X${tag[0]}${tag[1]}`}
                  type="image"
                  src={Delete}
                  alt="X"
                  className="tagDelete"
                  onClick={() => {
                    setTags(
                      tags
                        .slice(0, tags.indexOf(tag))
                        .concat(tags.slice(tags.indexOf(tag) + 1, tags.length)),
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <input
            placeholder="New Tag"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setTags(
                  tags.concat([
                    [newTag, colors[Math.floor(Math.random() * colors.length)]],
                  ]),
                );
                setNewTag('');
              }
            }}
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

          <div className="image-upload">
            <label htmlFor="file-input">
              <img src={imageURLs[0]} alt="Artwork" />

              <input
                type="file"
                id="file-input"
                name="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageURLS([URL.createObjectURL(e.target.files[0])]);
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* <img src={EmptyArtwork} alt="artwork" /> */}
          {/* <input
            type="file"
            src={EmptyArtwork}
            alt="artwork"
            name="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => {
              if (e.target.files) {
                setImageURLS([URL.createObjectURL(e.target.files[0])]);
                setFile(e.target.files[0]);
              }
            }}
          /> */}
          <div className="info-row">
            <textarea
              placeholder="Description"
              className="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {critiques.map((critique, i) => (
            <div className="deletable">
              <CritiqueComponent
                key={`${critique.title}${critique.critic}`}
                critique={critique}
                setCritique={(crit: Critique) => {
                  const newCritiques = Array.from(critiques);
                  newCritiques[i] = crit;
                  setCritiques(newCritiques);
                }}
              />
              <input
                key={`X${critique.title}${critique.critic}`}
                type="image"
                src={Delete}
                alt="X"
                className="critiqueDelete"
                onClick={() => {
                  setCritiques(
                    critiques
                      .slice(0, critiques.indexOf(critique))
                      .concat(
                        critiques.slice(
                          critiques.indexOf(critique) + 1,
                          critiques.length,
                        ),
                      ),
                  );
                }}
              />
            </div>
          ))}
          {/* <input
            className="title"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          /> */}
          <input
            type="button"
            value="+"
            onClick={() => {
              setCritiques(
                critiques.concat([
                  {
                    title: '',
                    critic: '',
                    transcript: '',
                    audioURL: '',
                    tags: [['', '']],
                    objectPath: '',
                  },
                ]),
              );
            }}
          />

          <input
            type="submit"
            value="Save"
            onClick={(e) => {
              // window.location.reload();
              uploadArtworkToCloud(
                host,
                {
                  title,
                  artist,
                  imageURLs,
                  description,
                  tags,
                  critiques,
                  objectPath:
                    props.artwork != null ? props.artwork?.objectPath : '',
                },
                file,
              );
              props.setArtwork({
                title,
                artist,
                imageURLs,
                description,
                tags,
                critiques,
                objectPath:
                  props.artwork != null ? props.artwork?.objectPath : '',
              });
            }}
          />
        </form>
      </div>
    </Card>
  );
};

EditPopup.defaultProps = {
  artwork: null,
};

export default EditPopup;
